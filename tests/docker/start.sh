#!/bin/sh
set -euo pipefail

DISCOURSE_URL="http://localhost"

# ---

# Detect CI / non-interactive TTYs
is_ci() {
  [[ "${CI:-}" == "true" ]] || [[ -n "${GITHUB_ACTIONS:-}${GITLAB_CI:-}${CIRCLECI:-}${TRAVIS:-}${BUILDKITE:-}${APPVEYOR:-}" ]]
}
is_nontty() { [[ ! -t 0 || ! -t 1 ]]; }

should_skip_updates() {
  is_ci || is_nontty || [[ "${SKIP_UPDATES:-}" == "1" ]]
}

START_TIMEOUT=240
CHECK_INTERVAL=0.5

docker-compose up -d

echo "Injecting no-rate-limits initializer..."
docker compose exec discourse bash -lc '
set -e
cat > /var/www/discourse/config/initializers/zzz_no_rate_limits.rb <<'"'"'RUBY'"'"'
# Disable Discourse rate limiting for test environments.
Rails.application.config.to_prepare do
  if defined?(::RateLimiter)
    ::RateLimiter.class_eval do
      def can_perform?(*); true; end
      def performed!(*); end
      def remaining(*); 1_000_000; end
    end
  end

  if defined?(::SecondBasedRateLimiter)
    ::SecondBasedRateLimiter.class_eval do
      def can_perform?(*); true; end
      def performed!(*); end
      def remaining(*); 1_000_000; end
    end
  end

  if defined?(::EmailRateLimiter)
    ::EmailRateLimiter.class_eval do
      def can_perform?(*); true; end
      def performed!(*); end
      def remaining(*); 1_000_000; end
    end
  end

  if defined?(::Auth) && defined?(::Auth::RateLimiter)
    ::Auth::RateLimiter.class_eval do
      def can_perform?(*); true; end
      def performed!(*); end
      def track!(*); end
      def remaining(*); 1_000_000; end
    end
  end
end
RUBY
'

start=$(date +%s)
end=$(( start + START_TIMEOUT ))

if should_skip_updates; then
  echo "Waiting for Discourse to finish starting (up to ${START_TIMEOUT}s)..."
else
  echo ""
fi

while :; do
  if curl -s "$DISCOURSE_URL" | grep -q "Powered by"; then
    elapsed=$(( $(date +%s) - start ))
    if ! should_skip_updates; then
      printf "\rDiscourse is up and running after %02d:%02ds.                   \n" $((elapsed/60)) $((elapsed%60))
    fi

    break
  fi

  # show mm:ss counter on the same line
  now=$(date +%s)
  elapsed=$(( now - start ))
  printf "\rWaiting for Discourse to finish starting... %02d:%02d / %02d:%02d" $((elapsed/60)) $((elapsed%60)) $((START_TIMEOUT/60)) $((START_TIMEOUT%60))

  if (( now >= end )); then
    echo
    echo "Timed out after ${START_TIMEOUT}s waiting for ${DISCOURSE_URL}"
    exit 1
  fi

  sleep "$CHECK_INTERVAL"
done

if [[ ! -e env.admin ]]; then
  echo "Creating ./env.admin with default ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD"
  echo "ADMIN_EMAIL=root@localhost.localdomain" > ./env.admin
  echo "ADMIN_USERNAME=admin" >> ./env.admin
  echo "ADMIN_PASSWORD=$(openssl rand -base64 24)" >> ./env.admin
fi

. ./env.admin

echo "Setting git safe.directory..."
docker compose exec discourse bash -lc \
 'git config --global --add safe.directory /var/www/discourse'

echo "Creating admin user..."
docker compose exec \
  -e ADMIN_EMAIL="$ADMIN_EMAIL" \
  -e ADMIN_USERNAME="$ADMIN_USERNAME" \
  -e ADMIN_PASSWORD="$ADMIN_PASSWORD" \
  discourse bash -lc '
bin/rails runner -e production "
em = ENV[%q{ADMIN_EMAIL}]
un = (ENV[%q{ADMIN_USERNAME}] || em.split(%q{@}).first)
pw = ENV[%q{ADMIN_PASSWORD}]
raise %(Missing ADMIN_EMAIL/ADMIN_PASSWORD) unless em && pw

u = User.find_by_email(em)
if u.nil?
  u = User.create!(email: em, username: un, password: pw)
else
  u.password = pw
  u.save!
end

# activate + approve + grant admin
u.activate                                   # marks email/user active
u.approved = true
u.admin = true
u.save!

puts %(OK: #{u.username} id=#{u.id} admin=#{u.admin} active=#{u.active})
"
'

ARGS=(-b cookie.txt -c cookie.txt -H "X-Requested-With: XMLHttpRequest")
function curly {
  curl "${ARGS[@]}" "$@"
}

CSRF=`curly -s -X GET $DISCOURSE_URL/session/csrf | jq -r '.csrf'`
ARGS+=(-H "X-CSRF-Token: $CSRF")

echo "Logging in as $ADMIN_USERNAME..."
curly -s -o /dev/null \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "login=$ADMIN_USERNAME" \
  --data-urlencode "password=$ADMIN_PASSWORD" \
  "$DISCOURSE_URL/session"

echo "Generating a new API key..."
API_KEY=`curly -s -X POST -H 'Content-Type: application/json' -d '{"key":{"description":"testing","username":null}}' "$DISCOURSE_URL/admin/api/keys" | jq -r '.key.key'`
echo API_KEY=$API_KEY
echo $API_KEY > api-key.txt

echo "{" > server.json
echo "  \"url\": \"$DISCOURSE_URL\"," >> server.json
# echo "  \"username\": \"$ADMIN_USERNAME\"," >> server.json
# echo "  \"password\": \"$ADMIN_PASSWORD\"," >> server.json
echo "  \"apiKey\": \"$API_KEY\"" >> server.json
echo "}" >> server.json

echo "Done."
