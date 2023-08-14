# discourse2

The complete Discourse API (strongly typed).

Copyright (c) 2023 by Gadi Cohen. [MIT Licensed](./LICENSE.txt).

![npm](https://img.shields.io/npm/v/discourse2) ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/gadicc/discourse2/release.yml) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gadicc/26d0f88b04b6883e1a6bba5b9b344fab/raw/jest-coverage-comment__main.json) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<img src="./assets/discourse-completion.png" alt="discourse completion" width="700"/>
<img src="./assets/discourse-getTopic-type.png" alt="discourse getTopic type" width="500"/>

## Quick Start

```ts
import Discourse from "discourse2";

const discourse = new Discourse("https://forums.kiri.art", {
  "Api-Key": process.env.DISCOURSE_API_KEY,
  "Api-Username": process.env.DISCOURSE_API_USERNAME,
});

const result = await discourse.listLatestTopics();
console.log(result);
```

## Notes

1. You can discover the API through TypeScript text completion, or
   at https://docs.discourse.org/.

1. Some endpoints (like `listLatestTopics`) require auth headers in their
   OpenAPI spec, but not in practice (provided the requested resource is a
   publicly visible one). For this reason, if auth headers are required (by
   spec) but not provided, we'll try the call anyway and let the endpoint
   decide.

1. Currently, **the response is not validated**, because unfortunately,
   the returned data often does not validate against the OpenAPI schema (`additionalProperties`, missing `required` props, wrong types).

   I'm still deciding what to do with about this, feedback (in an issue)
   would be greatly appreciated. In theory I'd like to make this a
   configurable option, but if we don't validate, we really should be
   returning the data as an `unknown` type so the user performs their
   own validation, which is a pain, and you'll lose typescript completion.
   However, on the flip side, what we do now is return a type that is
   wrong, and TypeScript won't warn about missing (but now required)
   checks.

1. Installed Discourse extensions / plugins may affect the result! It
   can add additional properties, etc. Likewise, running older versions
   of Discourse may return data that doesn't match the current spec.

## TODO

- [x] Validation (params; re response, see note above)

## Development

- `yarn schema:fetch` - fetches OpenAPI schema from Discourse
- `yarn schema:ts` - converts to TypeScript in `src/schema.d.ts`
- `yarn generate` - generates method stubs in `src/generated.ts`
