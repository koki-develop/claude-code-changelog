import { IconRss } from "@tabler/icons-react";
import ChangelogJson from "../data/changelog.json";
import ChangelogItem from "./components/ChangelogItem";
import Layout from "./components/Layout";

const feedUrl = "https://claude-code-changelog.vercel.app/feed.xml";

export default function App() {
  return (
    <Layout className="flex w-dvw flex-col gap-8 px-4">
      <div className="flex items-center justify-center gap-2">
        <a href={feedUrl} target="_blank" aria-label="Feed">
          <IconRss size={20} />
        </a>
        <div className="flex items-center gap-2 overflow-x-auto rounded bg-gray-200 px-3 py-1 font-mono text-gray-600">
          <span className="whitespace-nowrap">{feedUrl}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        {ChangelogJson.map((entry) => (
          <ChangelogItem
            key={entry.version}
            version={entry.version}
            publishedAt={entry.publishedAt}
            content={entry.content}
          />
        ))}
      </div>
    </Layout>
  );
}
