import ChangelogJson from "../data/changelog.json";
import ChangelogItem from "./components/ChangelogItem";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
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
