/**
 * @module
 *
 * The complete Discourse API, fully typed.
 *
 * @example
 * ```ts
 * import Discourse from "discourse2";
 *
 * const discourse = new Discourse("https://forums.kiri.art", {
 *   "Api-Key": process.env.DISCOURSE_API_KEY,
 *   "Api-Username": process.env.DISCOURSE_API_USERNAME,
 * });
 *
 * const result = await discourse.listLatestTopics();
 * ```
 */

import { Ajv } from "ajv";
import type { ValidateFunction } from "ajv";
import _ajvErrors from "ajv-errors";
import _ajvFormats from "ajv-formats";
import type { OpenAPIV3_1 } from "openapi-types";

import spec from "./openapi.json" with { type: "json" };
import DiscourseAPIGenerated from "./generated.ts";

// Previously we imported this from ./generated.ts, but, exporting it
// from there breaks the unwrapping.
type Prettify<T> =
  & {
    [K in keyof T]: T[K];
  }
  // deno-lint-ignore ban-types
  & {};

type Operation = OpenAPIV3_1.OperationObject;
type Schema = OpenAPIV3_1.SchemaObject;

const ajv: Ajv = new Ajv({
  // All rules, all errors.  Don't end early after first error.
  allErrors: true,
});
ajv.addKeyword("example");
const ajvErrors = _ajvErrors.default;
const ajvFormats = _ajvFormats.default;
ajvErrors(ajv /*, {singleError: true} */);
ajvFormats(ajv, ["email"]);

const compiled = new Map<object, ValidateFunction>();
function getValidator(schema: object) {
  let validator = compiled.get(schema);
  if (!validator) {
    validator = ajv.compile(schema);
    compiled.set(schema, validator);
  }
  return validator;
}

function schemaStub(): Schema {
  return {
    type: "object",
    additionalProperties: false,
    properties: {},
    required: [],
  };
}

const operationSchemas = new Map<object, Schema>();
function operationSchema(operation: Operation) {
  let schema = operationSchemas.get(operation);
  if (!schema) {
    schema = {
      type: "object",
      properties: {
        header: schemaStub(),
        path: schemaStub(),
        query: schemaStub(),
      },
      required: [],
    };

    if (operation.parameters) {
      for (const param of operation.parameters) {
        if (!("in" in param)) continue;
        const where = param.in;
        if (!["header", "path", "query"].includes(where)) {
          throw new Error("Unexpected parameter location: " + where);
        }
        if (!schema.required!.includes(where)) schema.required!.push(where);
        const properties = schema.properties!;
        const whereSchema = properties[where]!;
        if ("properties" in whereSchema) {
          whereSchema.properties![param.name] = param.schema!;

          // Workaround: the spec lists these as required but that's not
          // always the case, e.g. public data.
          const skip = where === "header" &&
            ["Api-Key", "Api-Username"].includes(param.name);

          if (param.required && !skip) whereSchema.required!.push(param.name);
        }
      }
    }

    if ("requestBody" in operation) {
      if (operation.requestBody && "content" in operation.requestBody) {
        const content = operation.requestBody.content;
        if ("properties" in schema) {
          const keys = Object.keys(content);
          if (keys.length === 0) {
            throw new Error("No requestBody content types");
          } else if (keys.length > 1) {
            throw new Error(
              "Multiple requestBody content types not supported, please report",
            );
          }
          const type = keys[0]!;

          const contentInner = content[type];
          if (contentInner) {
            schema.properties!.body = {
              type: "object",
              ...contentInner.schema!,
            };
            if (
              "required" in contentInner.schema! &&
              contentInner.schema!.required?.length &&
              !schema.required!.includes("body")
            ) {
              schema.required!.push("body");
            }

            // This is the only special case in the entire API, so no need
            // for anything fancy.  Accept ANY value for json-schema validation
            // and handle the actual validation in the method itself.
            if (operation.operationId === "createUpload") {
              schema.properties!.body = {};
            }
          } else {
            throw new Error("No " + type + " content type");
          }
        }
      }
    }

    // console.log(JSON.stringify(schema, null, 2));
    operationSchemas.set(operation, schema);
  }
  return schema;
}

const byOperationId: {
  [key: string]: { path: string; method: string; data: Operation };
} = {};
for (const [path, pathData] of Object.entries(spec.paths)) {
  for (const [method, methodData] of Object.entries(pathData)) {
    const operationId = methodData.operationId;
    byOperationId[operationId] = { path, method, data: methodData };
  }
}

/**
 * Returned when the HTTP status code is not 200.
 * The error message is available as the `message` property.
 * The status code is available as the `status` property.
 * The full response is available in the `request` property.
 */
export class HTTPError extends Error {
  status: number;
  response: Response;
  constructor(
    status: number,
    message: string,
    response: Response,
  ) {
    super(message);
    this.status = status;
    this.response = response;
  }
}

/**
 * Returned when the parameters provided to a method are invalid.
 * The exact (AJV) errors are available in the `errors` property.
 */
export class ParamaterValidationError extends Error {
  errors: typeof ajv.errors;
  constructor(message: string, errors: typeof ajv.errors) {
    super(message);
    this.errors = errors;
  }
}

/**
 * Returned when the response from the server is invalid.
 * The exact (AJV) errors are available in the `errors` property.
 */
export class ResponseValidationError extends Error {
  errors: typeof ajv.errors;
  constructor(message: string, errors: typeof ajv.errors) {
    super(message);
    this.errors = errors;
  }
}

/**
 * The full Discourse API class.
 *
 * @example
 * ```ts
 * import Discourse from "discourse2";
 *
 * const discourse = new Discourse("https://forums.kiri.art", {
 *   "Api-Key": process.env.DISCOURSE_API_KEY,
 *   "Api-Username": process.env.DISCOURSE_API_USERNAME,
 * });
 *
 * const result = await discourse.listLatestTopics();
 * ```
 */
export default class DiscourseAPI extends DiscourseAPIGenerated {
  private url: string;
  private "Api-Key"?: string;
  private "Api-Username"?: string;

  constructor(
    url: string,
    opts: { "Api-Key"?: string; "Api-Username"?: string } = {},
  ) {
    super();
    this.url = url;
    if (opts["Api-Key"]) this["Api-Key"] = opts["Api-Key"];
    if (opts["Api-Username"]) this["Api-Username"] = opts["Api-Username"];
  }

  override async _exec<T>(
    operationName: string,
    params = {} as Record<string, string>,
  ): Promise<unknown> {
    const operation = byOperationId[operationName];
    if (!operation) throw new Error("Unknown operation: " + operationName);

    // console.log(operationName, params);

    const header: { [key: string]: string } = {};
    const query: { [key: string]: string } = {};
    const path: { [key: string]: string } = {};
    const body: { [key: string]: string | Blob } = {};
    let formData;
    let contentType;

    if ("parameters" in operation.data) {
      const parameters = operation.data.parameters;
      if (!parameters) throw new Error("No parameters for " + operationName);

      for (const param of parameters) {
        if ("in" in param) {
          if (param.in === "header") {
            if (params[param.name]) {
              header[param.name] = params[param.name];
              delete params[param.name];
            } else if (["Api-Key", "Api-Username"].includes(param.name)) {
              const name = param.name as "Api-Key" | "Api-Username";
              const value = this[name];
              if (typeof value === "string") header[param.name] = value;
            }
          } else if (param.in === "query" && params[param.name] !== undefined) {
            query[param.name] = params[param.name];
            delete params[param.name];
          } else if (param.in === "path" && params[param.name] !== undefined) {
            path[param.name] = params[param.name];
            delete params[param.name];
          }
        } else {
          throw new Error(
            'Unexpected parameter type in "' +
              operationName +
              '": ' +
              JSON.stringify(param),
          );
        }
      }
    } else if (Object.keys(params).length) {
      throw new Error(
        operationName +
          " accepts no parameters, but given: " +
          JSON.stringify(params),
      );
    }

    if ("requestBody" in operation.data) {
      if (
        operation.data.requestBody &&
        "content" in operation.data.requestBody
      ) {
        const content = operation.data.requestBody.content;

        const keys = Object.keys(content) as Array<keyof typeof content>;
        if (keys.length === 0) {
          throw new Error("No requestBody content types for " + operationName);
        } else if (keys.length > 1) {
          throw new Error(
            "Multiple requestBody content types not supported, please report",
          );
        }
        const type = keys[0]!;

        const schema = content[type]?.schema;
        if (!schema) throw new Error("No schema for " + operationName);

        if ("properties" in schema) {
          const properties = Object.keys(schema.properties || {});
          for (const property of properties) {
            if (params[property] !== undefined) {
              body[property] = params[property];
              delete params[property];
            }
          }
        } else {
          throw new Error("Unexpected schema for " + operationName);
        }

        if (type === "application/json") {
          contentType = "application/json";
        } else if (type === "multipart/form-data") {
          formData = new FormData();
          for (const [key, value] of Object.entries(body)) {
            formData.append(key, value as string | Blob);
          }
        } else {
          throw new Error(
            "Unexpected requestBody content type for " + operationName,
          );
        }
      }
    }

    const additionalProperties = Object.keys(params);
    if (additionalProperties.length) {
      throw new Error(
        "Unknown parameter(s) for " +
          operationName +
          ": " +
          additionalProperties.join(", "),
      );
    }

    const validate = getValidator(operationSchema(operation.data));
    const valid = validate({ header, path, query, body });
    if (!valid) {
      const errors = validate.errors;
      // console.log("errors", errors);
      const message = ajv.errorsText(errors);
      const error = new ParamaterValidationError(message, errors);
      throw error;
    }

    // Do this after validation (of user headers)
    if (contentType) header["Content-Type"] = contentType;

    // Sometimes the OpenAPI doesn't list the Api-Key and Api-Username as parameters
    // but still requires them.  So, provide them even if not asked.
    (["Api-Key", "Api-Username"] as const).forEach((name) => {
      if (!header[name] && (params[name] || this[name])) {
        header[name] = this[name]!;
      }
    });

    // Substitue path parameters, e.g. /posts/{id} -> /posts/123
    let url = (this.url + operation.path).replace(
      /\{([^}]+)\}/g,
      (_, p) => (path[p] as string | undefined) || `{${p}}`,
    );

    // Include query parameters
    if (Object.keys(query).length) {
      url += "?" + new URLSearchParams(query).toString();
    }

    const requestInit: RequestInit = {
      method: operation.method,
      headers: new Headers(header),
      redirect: "manual",
    };

    if (operation.data.requestBody && "content" in operation.data.requestBody) {
      const content = operation.data.requestBody.content;
      if ("multipart/form-data" in content) {
        requestInit.body = formData;
      } else if ("application/json" in content) {
        requestInit.body = JSON.stringify(body);
      }
    }

    // console.log(url, requestInit);

    const responses = operation.data.responses;
    if (!responses) {
      throw new Error("No expected responses for " + operationName);
    }

    const response = await fetch(url, requestInit);

    const text = await response.text();
    if (response.status !== 200) {
      throw new HTTPError(response.status, text, response);
    }

    const response200 = responses["200"];
    if (!response200) throw new Error("No 200 response for " + operationName);

    if (!("content" in response200)) {
      return;
    }

    const content = response200.content;
    if (!(content && "application/json" in content)) {
      throw new Error(
        "No application/json content in 200 response for " + operationName,
      );
    }

    const json = JSON.parse(text);

    /*
    const schema =
      operation.data.responses["200"].content["application/json"].schema;
    schema.type = "object";

    const validate = getValidator(schema);
    const valid = validate(json);
    if (!valid) {
      const errors = validate.errors;
      if (errors && true) {
        const filteredErrors = errors.filter((error) => {
          if (error.keyword === "required") return false;
          if (error.keyword === "additionalProperties") return false;
          return true;
        });
        console.log("filtee", filteredErrors);
        if (filteredErrors.length === 0) return json;
      }
      // console.log(json);
      // console.log("errors", errors);
      const message = ajv.errorsText(errors);
      const error = new ResponseValidationError(message, errors);
      throw error;
    }
    */

    return json;
  }

  // Spec: { file: { type: "string", format: "binary" } }
  // @ts-expect-error: intentional break of types
  override createUpload(
    params: Prettify<
      Omit<Parameters<DiscourseAPIGenerated["createUpload"]>[0], "file"> & {
        file?: File | Blob;
      }
    >,
  ): Prettify<ReturnType<DiscourseAPIGenerated["createUpload"]>> {
    const file = params.file;
    if (file && !(file instanceof File || file instanceof Blob)) {
      throw new Error("file must be a File or Blob, not " + typeof file);
    }

    // @ts-expect-error: intentional break of types
    return super.createUpload(params);
  }

  override updateTopic(
    params: Parameters<DiscourseAPIGenerated["updateTopic"]>[0],
  ): ReturnType<DiscourseAPIGenerated["updateTopic"]> {
    console.warn(
      "At time of writing, updateTopic() is broken on the discourse side, see https://meta.discourse.org/t/stumped-on-api-update-of-topic/145330.",
    );
    return super.updateTopic(params);
  }

  override async getTopicByExternalId(
    params: Parameters<DiscourseAPIGenerated["getTopicByExternalId"]>[0],
  ): ReturnType<DiscourseAPIGenerated["getTopic"]> {
    try {
      await super.getTopicByExternalId(params);
    } catch (error) {
      if (error instanceof HTTPError && error.status === 301) {
        const location = error.response.headers.get("location");
        if (!location) {
          throw new Error("301 Redirect did not include location header");
        }

        const match = location.match(/\/(?<id>(\d)+)\.json$/);
        const id = match?.groups?.id;
        if (!id) throw new Error("Could not extract topic id from redirect");

        return super.getTopic({ id });
      }
      throw error;
    }
    throw new Error("Didn't receive redirect");
  }

  override getSpecificPostsFromTopic(
    params: Parameters<DiscourseAPIGenerated["getSpecificPostsFromTopic"]>[0],
  ): ReturnType<DiscourseAPIGenerated["getSpecificPostsFromTopic"]> {
    const operation = byOperationId.getSpecificPostsFromTopic.data;

    // Workaround for bug
    // https://meta.discourse.org/t/discourse-api-docs-mention-a-request-body-for-a-get-request/231137/13
    if (
      operation.requestBody && "content" in operation.requestBody &&
      "application/json" in operation.requestBody.content
    ) {
      const paramsSchema = operation.parameters;
      const rbSchema = operation.requestBody.content["application/json"].schema;
      if (
        paramsSchema && rbSchema && "properties" in rbSchema &&
        rbSchema.properties
      ) {
        if (
          Object.keys(rbSchema.properties).length === 1 &&
          "post_ids[]" in rbSchema.properties
        ) {
          paramsSchema.push({
            name: "post_ids[]",
            in: "query",
            schema: { type: "integer" },
            required: true,
          });
        }
      }
      delete operation.requestBody;
    }

    return super.getSpecificPostsFromTopic(params);
  }

  /*
  // OpenAPI spec doesn't allow additionalProperties so we get Record<string,never>
  // Also, needs Discourse Connect setup ahead of time.
  override updateUser(
    params: Prettify<
      & Omit<Parameters<DiscourseAPIGenerated["updateUser"]>[0], "external_ids">
      & {
        external_ids?: Record<string, string>;
      }
    >,
  ): ReturnType<DiscourseAPIGenerated["updateUser"]> {
    // @ts-expect-error: override spec
    return super.updateUser(params);
  }
  */
}
