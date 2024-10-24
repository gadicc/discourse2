import spec from "../src/openapi.json" with { type: "json" };
import type { OpenAPIV3_1 } from "openapi-types";

type Operation = OpenAPIV3_1.OperationObject;

function indent(stringWithNewLines: string, indent = "  ") {
  return stringWithNewLines
    .split("\n")
    .map((line) => (line === "" ? line : indent + line))
    .join("\n");
}

// https://www.reddit.com/r/typescript/comments/1f01piq/comment/lju8vab/
// split unions, then map to object with entries, then extract entries
type Entry<T> = T extends infer O extends object
  ? { [K in keyof O]: [K, O[K]] }[keyof O]
  : never;
function objectEntries<T extends object>(obj: T): Entry<T>[] {
  return Object.entries(obj) as Entry<T>;
}

type Method =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";
const methods = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as Method[];

(async () => {
  let out = 'import type { operations } from "./schema.d.ts";' + "\n\n";
  out +=
    "type Prettify<T> = {\n  [K in keyof T]: T[K];\n// deno-lint-ignore ban-types\n} & {}\n\n";
  out += "export default class DiscourseAPIGenerated {\n";
  out +=
    "  _exec<T>(_operationName: string, _params?: unknown) { throw new Error('Not implemented'); }\n\n";

  for (const [path, pathData] of objectEntries(spec.paths)) {
    for (const method of methods) {
      if (!(method in pathData)) continue;

      // Someone smarter than me can figure out a better type-safe way to do this
      let methodData: OpenAPIV3_1.OperationObject;
      if (method === "get" && "get" in pathData) {
        methodData = pathData.get as Operation;
      } else if (method === "put" && "put" in pathData) {
        methodData = pathData.put as Operation;
      } else if (method === "post" && "post" in pathData) {
        methodData = pathData.post as Operation;
      } else if (method === "delete" && "delete" in pathData) {
        methodData = pathData.delete as Operation;
      } else if (method === "options" && "options" in pathData) {
        methodData = pathData.options as Operation;
      } else if (method === "head" && "head" in pathData) {
        methodData = pathData.head as Operation;
      } else if (method === "patch" && "patch" in pathData) {
        methodData = pathData.patch as Operation;
      } else if (method === "trace" && "trace" in pathData) {
        methodData = pathData.trace as Operation;
      } else continue;

      const operationId = methodData.operationId;

      let comment = "/**\n * " + methodData.summary + "\n";
      if (methodData.description) {
        comment += indent(
          "@description " + methodData.description.trim() + "\n",
          " * ",
        );
      }
      comment += " */\n";

      let methodString = indent(comment);
      methodString += indent(operationId + "(");

      console.log(operationId);

      let required = false;
      const types = [] as string[];

      if (methodData.parameters) {
        for (const parameter of methodData.parameters) {
          if (!("in" in parameter)) continue;
          if (parameter.in === "header") continue;
          if (!required && parameter.required) required = true;
          if (types.indexOf(parameter.in) === -1) types.push(parameter.in);
        }
      }

      if (!required) {
        if (methodData.requestBody && "content" in methodData.requestBody) {
          if ("application/json" in methodData.requestBody.content) {
            const schema =
              methodData.requestBody.content["application/json"].schema;
            if (schema && "required" in schema) {
              if (schema.required && schema.required.length) {
                required = true;
              }
            }
          } else if ("multipart/form-data" in methodData.requestBody.content) {
            const schema =
              methodData.requestBody.content["multipart/form-data"].schema;
            if (schema && "required" in schema) {
              if (schema.required && schema.required.length) {
                required = true;
              }
            }
          } else {
            console.warn("  * Unknown content type");
          }
        }
      }

      if (types.length || methodData.requestBody) {
        methodString += "params" +
          (required ? "" : "?") +
          ": " +
          types
            .map(
              (type) =>
                `Prettify<operations['${operationId}']['parameters']['${type}']>`,
            )
            .join(" & ");
      }

      if (methodData.requestBody) {
        if ("content" in methodData.requestBody) {
          const content = methodData.requestBody.content;
          const keys = Object.keys(content) as Array<keyof typeof content>;
          if (keys.length > 1) {
            throw new Error(
              "Multiple requestBody content types not supported, please report",
            );
          }
          const type = keys[0];
          if (types.length) methodString += " & ";
          methodString += "Prettify<NonNullable<operations['" +
            operationId +
            "']['requestBody']>['content']['" +
            type +
            "']>";
        } else {
          console.warn("  * No content in requestBody field");
        }
      }

      methodString += ")";

      let returnType = null;
      if (methodData?.responses?.["200"]) {
        if ("content" in methodData.responses["200"]) {
          const content = methodData.responses["200"].content;
          if (content) {
            if ("application/json" in content) {
              returnType = "Promise<Prettify<operations['" +
                operationId +
                "']['responses']['200']['content']['application/json']>>";
            } else {
              throw new Error(
                "No application/json content found in 200 response, please report",
              );
            }
          } else {
            throw new Error(
              "No application/json content found in 200 response, please report",
            );
          }
        } else {
          // console.warn("  * No content field");
          returnType = "Promise<void>";
        }
      } else if (methodData?.responses?.["301"]) {
        if (path === "/t/external_id/{external_id}.json") {
          returnType =
            "Promise<Prettify<operations['getTopic']['responses']['200']['content']['application/json']>>";
        } else {
          console.warn("  * 301, not handled yet");
        }
      } else {
        throw new Error("No 200 response found, please report");
      }

      if (returnType) {
        methodString += ": " + returnType;
      }

      methodString += " {\n";

      methodString += indent(
        "  return this._exec<operations['" +
          operationId +
          "']>('" +
          operationId +
          "'" +
          (types.length || methodData.requestBody ? ", params" : "") +
          ")" +
          (returnType ? " as unknown as " + returnType : "") +
          ";\n",
      );

      methodString += indent("}\n\n");

      out += methodString;
    }
  }
  out += "}\n";

  const encoder = new TextEncoder();
  const data = encoder.encode(out);
  await Deno.writeFile("./src/generated.ts", data);
})();
