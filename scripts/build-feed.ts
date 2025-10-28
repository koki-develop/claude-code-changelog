import { Feed } from "feed";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";
import ChangelogJson from "../data/changelog.json";

const feed = new Feed({
  title: "Claude Code Changelog",
  id: "https://claude-code-changelog.vercel.app",
  copyright: "All rights reserved 2025, koki-develop",
});

await Promise.all(
  ChangelogJson.slice(0, 50).map(async (item, i) => {
    const publishedAt: Date = (() => {
      if (item.publishedAt) {
        return new Date(item.publishedAt);
      }

      let count = 1;
      while (true) {
        const nextItem = ChangelogJson[i + count];
        if (!nextItem) {
          return new Date();
        }
        if (nextItem.publishedAt) {
          return new Date(nextItem.publishedAt);
        }

        count++;
      }
    })();

    feed.addItem({
      title: item.version,
      link: `https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#${item.version.replaceAll(".", "")}`,
      date: publishedAt,
      content: await marked.parse(item.content),
    });
  }),
);

fs.writeFileSync(
  path.join(process.cwd(), "public", "feed.xml"),
  feed.atom1() + "\n",
);
