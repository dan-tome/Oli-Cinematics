import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const packageJsonPath = resolve(rootDir, "package.json");
const outputDir = resolve(rootDir, "src", "generated");
const outputPath = resolve(outputDir, "build-meta.ts");

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const baseVersion = packageJson.version ?? "0.0.0";

const now = new Date();
const buildStamp = [
  now.getUTCFullYear(),
  String(now.getUTCMonth() + 1).padStart(2, "0"),
  String(now.getUTCDate()).padStart(2, "0"),
  String(now.getUTCHours()).padStart(2, "0"),
  String(now.getUTCMinutes()).padStart(2, "0"),
  String(now.getUTCSeconds()).padStart(2, "0"),
].join("");

const commitHint = (process.env.RENDER_GIT_COMMIT || process.env.GITHUB_SHA || "local").slice(0, 7);
const buildVersion = `${baseVersion}+${buildStamp}.${commitHint}`;

const content = `// Auto-generated during build. Do not edit manually.
export const buildVersion = "${buildVersion}";
`;

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, content, "utf8");

console.log(`Generated ${outputPath}`);
console.log(`Build version: ${buildVersion}`);
