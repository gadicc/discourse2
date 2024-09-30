import fs from "fs/promises";
import camelCase from "camelcase";

import spec from "./openapi.json";
import { compile } from "json-schema-to-typescript";

function indent(stringWithNewLines: string) {
  return stringWithNewLines
    .split("\n")
    .map((line) => (line === "" ? line : "  " + line))
    .join("\n");
}

(async () => {
  let out = 'import { operations } from "./schema";' + "\n\n";
  out += "type Prettify<T> = {\n  [K in keyof T]: T[K];\n} & {}\n\n";
  out += "export default class DiscourseAPIGenerated {\n";
  out +=
    "  _exec<T>(operationName: string, params?: any) { throw new Error('Not implemented'); }\n\n";

  for (const [path, pathData] of Object.entries(spec.paths)) {
    for (const [method, methodData] of Object.entries(pathData)) {
      const operationId = methodData.operationId;
      let methodString = indent("/**\n * " + methodData.summary + "\n */\n");

      methodString += indent(operationId + "(");

      console.log(operationId);

      let required = false;
      const types = [] as string[];

      if (methodData.parameters) {
        for (const parameter of methodData.parameters) {
          if (parameter.in === "header") continue;
          if (!required && parameter.required) required = true;
          if (types.indexOf(parameter.in) === -1) types.push(parameter.in);
        }
      }

      if (types.length)
        methodString +=
          "params" +
          (required ? "" : "?") +
          ": " +
          types
            .map(
              (type) =>
                `Prettify<operations['${operationId}']['parameters']['${type}']>`,
            )
            .join(" & ");

      methodString += ") ";

      let returnType = null;
      if (methodData?.responses?.["200"]?.content?.["application/json"]) {
        returnType =
          "Promise<Prettify<operations['" +
          operationId +
          "']['responses']['200']['content']['application/json']>> ";

        // We can just rely on the returned type inside the function
        // methodString += ": " + returnType;
      }

      methodString += "{\n";

      methodString += indent(
        "  return this._exec<operations['" +
          operationId +
          "']>('" +
          operationId +
          "'" +
          (types.length ? ", params" : "") +
          ")" +
          (returnType ? " as unknown as " + returnType : "") +
          ";\n",
      );

      methodString += indent("}\n\n");

      out += methodString;
    }
  }
  out += "}\n";

  await fs.writeFile("src/generated.ts", out);
})();
