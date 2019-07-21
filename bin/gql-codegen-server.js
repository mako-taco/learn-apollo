#!/usr/bin/env node
const fs = require("fs");
const gst = require("graphql-schema-typescript");

const args = process.argv.slice(2);

const schemaPath = args[0];
const schema = fs.readFileSync(schemaPath).toString();
const outputPath = args[1];

gst
  .generateTypeScriptTypes(schema, outputPath, {
    strictNulls: true,
    smartTResult: true,
    smartTParent: true,
    asyncResult: true,
    requireResolverTypes: false,
    contextType: "GQLContext",
    importStatements: ["import {GQLContext} from './context';"]
  })
  .then(() => {
    console.log(`Generated GQL types at ${outputPath}.`);
  })
  .catch(err => {
    if (err.locations) {
      const lines = schema.split("\n");
      err.locations.forEach(({ line, column }) => {
        const start = Math.max(line - 2, 0);
        const end = Math.min(lines.length - 1, start + 5);
        const errContext = lines
          .slice(start, end)
          .map((ctx, i) => {
            return `${i + 1 + start}\t${ctx}`;
          })
          .join("\n");
        console.error(
          `${err.message} at line ${line}, col ${column}:\n\n${errContext}`
        );
      });
    }
    throw err;
  })
  .then(
    () =>
      new Promise((resolve, reject) => {
        const schemaAsString = `\nexport const schema: string = \`\n${schema}\`\n`;
        fs.appendFile(outputPath, schemaAsString, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      })
  )
  .then(() => {
    console.log(`Appended schema to ${outputPath}.`);
    console.log(`Done.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
