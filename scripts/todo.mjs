// Lists every open `TODO(owner)` placeholder (file:line) grouped by file. Usage: npm run todo
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MARKER = "TODO(owner)";
const skip = (path) => /\.test\.ts$/.test(path) || path.endsWith("lib/todo.ts");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(tsx?|css|md)$/.test(name) && !skip(path) ? [path] : [];
  });
}

let total = 0;
for (const file of walk("src")) {
  const hits = readFileSync(file, "utf8")
    .split("\n")
    // Placeholders only: skip prose that merely mentions the marker (comments describing the mechanism).
    .map((text, i) => ({ text, line: i + 1 }))
    .filter(({ text }) => text.includes(`"${MARKER}`) || text.includes(`'${MARKER}`) || text.includes(`\`${MARKER}`) === false && /\/\/\s*TODO\(owner\)/.test(text));
  if (hits.length === 0) continue;
  console.log(`\n${file}`);
  for (const { line, text } of hits) console.log(`  ${line}: ${text.trim().slice(0, 110)}`);
  total += hits.length;
}
console.log(`\n${total} open placeholder${total === 1 ? "" : "s"}`);
process.exit(0);
