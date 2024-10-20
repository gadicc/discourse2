# Environment

The package is developed in [Deno](https://deno.com/), see that page for
installation instructions or use your local package manager.

See the `tasks` property in our [deno.json](./deno.json) for useful tasks, e.g.
`deno task test`. Be familiar also with `deno fmt` and `deno lint`. If using
VSCode, see the
[vscode-deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
extension. The project is already [configured](./.vscode/settings.json) to use
it.

# OpenAPI schema retrieval and type generations

- `deno task schema:sync` will check if the schema is up to date, and if not,
  make necessary updates and regenerations and commit the changes. If `CI=true`,
  it will also `git push` (which will trigger a rebuild and release).

Older method:

- ~~`yarn schema:fetch` - fetches OpenAPI schema from Discourse~~
- ~~`yarn schema:ts` - converts to TypeScript in `src/schema.d.ts`~~
- ~~`yarn generate` - generates method stubs in `src/generated.ts`~~

# Testing

Most tests are [end-to-end tests](./tests/e2e/) run against a real, fresh
Discourse installation running in [docker](./tests/docker/). However, all http
requests and their responses are cached with `fetch-mock-cache` (
[npm](https://www.npmjs.com/package/fetch-mock-cache),
[jsr](https://jsr.io/@gadicc/fetch-mock-cache) ), so it's unlikely you'll need
to setup Discourse yourself.

Probably all you need is:

```bash
# Run all tests
$ deno task test

# Filter for specific tests
$ deno task test --filter backups

# Generate and report coverage
$ deno task coverage
```

**Test focus**

Remember when writing tests that we're not trying to test _Discourse_, we're
just trying to test this library, which mostly involves making sure our OpenAPI
translation layer works as expected (i.e. it's handling of params / request /
response). In short:

- Don't test _Discourse_ (e.g. don't test that API calls create an expected
  state)
- Don't test handling of invalid values - this is all caught by validation
- Likewise for expected response... only the most minimal checks are necessary.
- Do check that every API call "works", without throwing an error, and with a
  sane result (but again, only a minimal check is necessary).
