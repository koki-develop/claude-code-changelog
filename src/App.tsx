import Markdown from "react-markdown";
import ChangelogJson from "../data/changelog.json";

export default function App() {
  return (
    <div>
      <h1>Claude Code Changelog</h1>

      <ul>
        {ChangelogJson.map((entry) => (
          <li key={entry.version}>
            <h2>
              {entry.version}
              {entry.publishedAt &&
                ` (${new Date(entry.publishedAt).toLocaleDateString()})`}
            </h2>
            <Markdown
              components={{
                a: ({ node: _, ...props }) => (
                  <a {...props} target="_blank" rel="noreferrer" />
                ),
              }}
            >
              {entry.content}
            </Markdown>
          </li>
        ))}
      </ul>
    </div>
  );
}
