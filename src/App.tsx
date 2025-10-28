import { IconCheck, IconCopy, IconRss } from "@tabler/icons-react";
import ChangelogJson from "../data/changelog.json";
import ChangelogItem from "./components/ChangelogItem";
import CopyButton from "./components/CopyButton";
import Layout from "./components/Layout";

const feedUrl = "https://claude-code-changelog.vercel.app/feed.xml";

export default function App() {
  return (
    <Layout className="flex flex-col gap-8">
      <div className="flex max-w-dvw items-center justify-center gap-2">
        <IconRss size={20} />
        <div className="flex items-center gap-2 overflow-x-auto rounded bg-gray-200 px-3 py-1 font-mono text-gray-600">
          <span className="whitespace-nowrap">{feedUrl}</span>
          <CopyButton value={feedUrl}>
            {({ copied }) =>
              copied ? (
                <IconCheck className="text-green-600" size={16} />
              ) : (
                <IconCopy size={16} />
              )
            }
          </CopyButton>
        </div>
      </div>

      <div className="flex max-w-3xl flex-col gap-8 px-4">
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
