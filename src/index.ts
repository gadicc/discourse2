import spec from "./openapi.json";
import DiscourseAPIGenerated from "./generated";

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

export default class DiscourseAPI extends DiscourseAPIGenerated {
  private url: string;
  private "Api-Key"?: string;
  private "Api-Username"?: string;

  constructor(
    url: string,
    opts: { "Api-Key"?: string; "Api-Username"?: string },
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

    // validate params

    // TODO headers
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

    return json;
  }
}
