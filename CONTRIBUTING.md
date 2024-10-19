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
