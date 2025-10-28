import ChangelogJson from "../data/changelog.json";
import ChangelogCard from "./components/ChangelogCard";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <div className="space-y-6">
        {ChangelogJson.map((entry) => (
          <ChangelogCard
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
