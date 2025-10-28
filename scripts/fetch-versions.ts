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

const versions: Record<string, string> = (() => {
  const { time } = data;
  delete time["created"];
  delete time["modified"];

  // Merge with existing versions to preserve any previously fetched data
  if (fs.existsSync(versionsJsonPath)) {
    const existingVersions = JSON.parse(
      fs.readFileSync(versionsJsonPath, "utf-8"),
    );
    return {
      ...existingVersions,
      ...time,
    };
  }

  return time;
})();

fs.writeFileSync(versionsJsonPath, JSON.stringify(versions, null, 2) + "\n");
