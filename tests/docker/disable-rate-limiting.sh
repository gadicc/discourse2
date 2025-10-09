#!/bin/sh

# Thanks ChatGPT :)

docker compose exec discourse bash -lc '
bin/rails runner -e production "
def set_setting(key, value)
  setter = \"#{key}=\"
  if SiteSetting.respond_to?(setter)
    SiteSetting.public_send(setter, value)
    puts %(  #{key}=#{value})
    true
  else
    false
  end
end

puts \"Disabling/relaxing rate limits...\\nUpdated settings:\"

# 0) Try to disable Rack::Attack if present (disables generic request 429s)
set_setting(:enable_rack_attack, false) ||
set_setting(:rack_attack_enabled, false)

# 1) Core posting/topic cadence
set_setting(:rate_limit_create_post, 0)
set_setting(:rate_limit_create_topic, 0)
set_setting(:min_first_post_typing_time, 0)

# 2) Request-per-IP throttles (different installs call these differently)
[
  :max_reqs_per_ip_per_10_seconds,
  :max_requests_per_ip_per_10_seconds,
  :max_requests_per_ip_per_minute,
  :max_reqs_per_ip_per_minute,
  :max_reqs_per_ip_window
].each { |k| set_setting(k, 0) || set_setting(k, 100_000) }

# API-specific window (name varies or may not exist)
[
  :max_reqs_per_ip_per_10_seconds_api,
  :max_requests_per_ip_per_10_seconds_api,
  :max_api_reqs_per_ip_per_10_seconds
].each { |k| set_setting(k, 0) || set_setting(k, 100_000) }

# 3) Login/signup throttles
set_setting(:max_logins_per_ip_per_minute, 100_000)
set_setting(:max_logins_per_ip_per_hour,   100_000)
[
  :max_failed_logins_per_ip_per_hour,
  :max_failed_logins_per_ip_per_minute
].each { |k| set_setting(k, 100_000) }

# 4) New-user content limits (use big numbers instead of 0 for counts)
[
  :newuser_max_replies_per_topic,
  :newuser_max_mentions_per_post,
  :newuser_max_links,
  :newuser_max_images,
  :newuser_max_attachments,
  :newuser_max_embedded_media,
  :newuser_max_replies_per_day,  # may not exist
  :newuser_max_topics_per_day    # may not exist
].each { |k| set_setting(k, 100_000) }

# 5) Per-user/day posting caps (if present)
[
  :max_posts_per_day,             # sometimes present
  :max_topics_per_day
].each { |k| set_setting(k, 100_000) }

# 6) Search throttles (names vary a lot)
[
  :search_min_post_count,         # not a throttle but keeps search open on tiny sites
  :search_query_min_length,
  :search_recent_searches_size,
  :max_searches_per_minute,
  :max_search_per_minute_per_ip,
  :search_rate_limit_seconds
].each do |k|
  if k == :search_query_min_length
    set_setting(k, 1)
  elsif k == :search_recent_searches_size
    set_setting(k, 0) || set_setting(k, 100_000)
  else
    set_setting(k, 0) || set_setting(k, 100_000)
  end
end

puts \"\\nDone.\"
"
'