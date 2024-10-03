import Ajv from "ajv";
import type { ValidateFunction } from "ajv";
import ajvErrors from "ajv-errors";
import type { OpenAPIV3_1 } from "openapi-types";

import spec from "./openapi.json";
import DiscourseAPIGenerated from "./generated";

type Operation = OpenAPIV3_1.OperationObject;
type Schema = OpenAPIV3_1.SchemaObject;

const ajv = new Ajv({
  // All rules, all errors.  Don't end early after first error.
  allErrors: true,
});
ajvErrors(ajv /*, {singleError: true} */);

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
          const skip =
            where === "header" &&
            ["Api-Key", "Api-Username"].includes(param.name);
          if (param.required && !skip) whereSchema.required!.push(param.name);
        }
      }
    }

    if ("requestBody" in operation) {
      if (operation.requestBody && "content" in operation.requestBody) {
        const content = operation.requestBody.content;
        if ("properties" in schema) {
          const contentInner = content["application/json"];
          if (contentInner) {
            schema.properties!.body = {
              type: "object",
              ...contentInner.schema!,
            };
            if (
              "required" in contentInner.schema! &&
              contentInner.schema!.required &&
              !schema.required!.includes("body")
            )
              schema.required!.push("body");
          } else {
            throw new Error("No application/json content type");
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

export class HTTPError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class ParamaterValidationError extends Error {
  errors: typeof ajv.errors;
  constructor(message: string, errors: typeof ajv.errors) {
    super(message);
    this.errors = errors;
  }
}

export class ResponseValidationError extends Error {
  errors: typeof ajv.errors;
  constructor(message: string, errors: typeof ajv.errors) {
    super(message);
    this.errors = errors;
  }
}

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

  async _exec<T>(operationName: string, params = {} as any) {
    const operation = byOperationId[operationName];
    if (!operation) throw new Error("Unknown operation: " + operationName);

    // console.log(operationName, params);

    const header: { [key: string]: string } = {};
    const query: { [key: string]: string } = {};
    const path: { [key: string]: string } = {};
    const body: { [key: string]: string } = {};

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
    } else {
      throw new Error(
        operationName +
          " accepts no parameters, but given: " +
          JSON.stringify(params),
      );
    }

    const additionalProperties = Object.keys(params);
    if (additionalProperties.length)
      throw new Error(
        "Unknown parameter(s) for " +
          operationName +
          ": " +
          additionalProperties.join(", "),
      );

    if ("requestBody" in operation.data) {
      if (
        operation.data.requestBody &&
        "content" in operation.data.requestBody
      ) {
        const content = operation.data.requestBody.content;

        const keys = Object.keys(content) as Array<keyof typeof content>;
        if (keys.length > 1)
          throw new Error(
            "Multiple requestBody content types not supported, please report",
          );
        const type = keys[0];

        if (type === "application/json") {
          header["content-type"] = type;
          const schema = content[type]?.schema;
          if (!schema) throw new Error("No schema for " + operationName);

          if ("properties" in schema) {
            const properties = Object.keys(schema.properties || {});
            for (const property of properties) {
              if (params[property] !== undefined) {
                body[property] = params[property];
              }
            }
          } else {
            throw new Error("Unexpected schema for " + operationName);
          }
        } else {
          throw new Error(
            "Unexpected requestBody content type for " + operationName,
          );
        }
      }
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

    // Sometimes the OpenAPI doesn't list the Api-Key and Api-Username as parameters
    // but still requires them.  So, provide them even if not asked.
    (["Api-Key", "Api-Username"] as const).forEach((name) => {
      if (!header[name] && (params[name] || this[name]))
        header[name] = this[name]!;
    });

    // Substitue path parameters, e.g. /posts/{id} -> /posts/123
    let url = (this.url + operation.path).replace(
      /\{([^}]+)\}/g,
      (_, p) => path[p] || `{${p}}`,
    );

    // Include query parameters
    if (Object.keys(query).length)
      url += "?" + new URLSearchParams(query).toString();

    const requestInit: RequestInit = {
      method: operation.method,
      headers: new Headers(header),
      body: operation.method === "post" ? JSON.stringify(body) : undefined,
    };

    // console.log(url, requestInit);

    const response = await fetch(url, requestInit);
    const text = await response.text();
    if (response.status !== 200) {
      throw new HTTPError(response.status, text);
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
}
