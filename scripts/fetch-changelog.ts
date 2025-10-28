import fs from "node:fs";
import path from "node:path";
import versions from "../data/versions.json";

const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not set");
}

async function fetchChangelog(): Promise<string> {
  // See: https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
  const endpoint =
    "https://api.github.com/repos/anthropics/claude-code/contents/CHANGELOG.md";

  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/vnd.github.object",
      Authorization: `Bearer ${githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch changelog: ${response.status} ${await response.text()}`,
    );
  }

  const data = await response.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

type ChangelogEntry = {
  version: string;
  content: string;
  publishedAt: Date | null;
};

async function parseChangelog(content: string): Promise<ChangelogEntry[]> {
  const entries: ChangelogEntry[] = [];
  const lines = content.split("\n");

  let currentVersion: string | null = null;
  const currentContentLines: string[] = [];
  for (const line of lines) {
    // Match version numbers in the format `## x.y.z`
    const versionMatch = line.match(/^## (\d+\.\d+\.\d+)/);
    if (versionMatch) {
      // Save the previous entry if it exists
      if (currentVersion) {
        const publishedAt = new Date(
          versions[currentVersion as keyof typeof versions],
        );
        entries.push({
          version: currentVersion,
          content: currentContentLines.join("\n").trim(),
          publishedAt: Number.isNaN(publishedAt.getTime()) ? null : publishedAt,
        });
      }
      // Start a new entry
      currentVersion = versionMatch[1];
      currentContentLines.length = 0; // Clear the content lines
    } else if (currentVersion) {
      // Accumulate content lines for the current version
      currentContentLines.push(line);
    }
  }

  // Save the last entry if it exists
  if (currentVersion) {
    entries.push({
      version: currentVersion,
      content: currentContentLines.join("\n").trim(),
      publishedAt: new Date(versions[currentVersion as keyof typeof versions]),
    });
  }

  return entries;
}

// ---

// Fetch the latest changelog from GitHub
const changelog = await fetchChangelog();

// Parse the changelog into individual entries
const entries = await parseChangelog(changelog);

// Write the parsed entries to a JSON file
fs.writeFileSync(
  path.join(process.cwd(), "data/changelog.json"),
  JSON.stringify(entries, null, 2) + "\n",
);
