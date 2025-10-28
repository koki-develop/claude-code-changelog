import fs from "node:fs";
import path from "node:path";

const versionsJsonPath = path.join(process.cwd(), "data/versions.json");

const endpoint = "https://registry.npmjs.org/@anthropic-ai/claude-code";
const response = await fetch(endpoint);
if (!response.ok) {
  throw new Error(
    `Failed to fetch versions: ${response.status} ${await response.text()}`,
  );
}
const data = await response.json();

const { time: versions } = data;
delete versions["created"];
delete versions["modified"];

fs.writeFileSync(versionsJsonPath, JSON.stringify(versions, null, 2) + "\n");
