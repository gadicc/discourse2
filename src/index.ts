import Ajv from "ajv";
import type { ValidateFunction } from "ajv";
import ajvErrors from "ajv-errors";

import spec from "./openapi.json";
import DiscourseAPIGenerated from "./generated";

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

const paramatersSchemas = new Map<object, object>();
function paramatersSchema(params: { name: string; schema: object }[]) {
  let schema = paramatersSchemas.get(params);
  if (!schema) {
    schema = {
      type: "object",
      additionalProperties: {
        not: true,
        errorMessage: "Unknown parameter ${0#}",
      },
      properties: Object.fromEntries(
        params.map((param) => {
          return [param.name, param.schema];
        }),
      ),
    };
    paramatersSchemas.set(params, schema);
  }
  return schema;
}

const byOperationId: {
  [key: string]: { path: string; method: string; data: any };
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
    this["Api-Key"] = opts["Api-Key"];
    this["Api-Username"] = opts["Api-Username"];
  }

  async _exec<T>(operationName: string, params?: any) {
    const operation = byOperationId[operationName];
    if (!operation) throw new Error("Unknown operation: " + operationName);

    // console.log(operationName, params);

    if (operation.data.parameters) {
      const validate = getValidator(
        paramatersSchema(operation.data.parameters),
      );
      const valid = validate(params || {});
      if (!valid) {
        const errors = validate.errors;
        // console.log("errors", errors);
        const message = ajv.errorsText(errors);
        const error = new ParamaterValidationError(message, errors);
        throw error;
      }
    } else {
      throw new Error(
        operationName +
          " accepts no parameters, but given: " +
          JSON.stringify(params),
      );
    }

    const headers: { [key: string]: string } = {};
    const query: { [key: string]: string } = {};
    const path: { [key: string]: string } = {};

    for (const param of operation.data.parameters) {
      if (param.in === "header") {
        headers[param.name] =
          (params && params[param.name]) ||
          this[param.name as "Api-Key" | "Api-Username"];
      } else if (param.in === "query") {
        query[param.name] = params && params[param.name];
      } else if (param.in === "path") {
        path[param.name] = params && params[param.name];
      }
    }

    if (!headers["Api-Key"]) {
      delete headers["Api-Key"];
      delete headers["Api-Username"];
    }

    const url = (this.url + operation.path).replace(
      /\{([^}]+)\}/g,
      (_, p) => params[p],
    );

    const requestInit: RequestInit = {
      method: operation.method,
      headers,
      body: operation.method === "POST" ? JSON.stringify(params) : undefined,
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
