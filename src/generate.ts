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
  out += "export default class DiscourseAPIGenerated {\n";
  out +=
    "  _exec<T>(operationName: string, params?: any) { throw new Error('Not implemented'); }\n\n";

  for (const [path, pathData] of Object.entries(spec.paths)) {
    for (const [method, methodData] of Object.entries(pathData)) {
      const operationId = methodData.operationId;
      let methodString = indent("/**\n * " + methodData.summary + "\n */\n");

      methodString += indent(operationId + "(");

      let type = null;
      if (methodData.parameters) {
        let required = false;
        for (const parameter of methodData.parameters) {
          if (!type && parameter.in !== "header") type = parameter.in;
          if (!required && parameter.required) required = true;
        }
        if (type) {
          methodString +=
            "params" +
            (required ? "?" : "") +
            ": operations['" +
            operationId +
            "']['parameters']['" +
            type +
            "']";
        }
      }

      methodString += ")";

      let returnType = null;
      if (methodData?.responses?.["200"]?.content?.["application/json"]) {
        returnType =
          "Promise<operations['" +
          operationId +
          "']['responses']['200']['content']['application/json']> ";
        methodString += ": " + returnType;
      }

      methodString += "{\n";

      methodString += indent(
        "  return this._exec<operations['" +
          operationId +
          "']>('" +
          operationId +
          "'" +
          (type ? ", params" : "") +
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
