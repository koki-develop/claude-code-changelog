import Markdown from "./Markdown";

type Props = {
  version: string;
  publishedAt: string | null;
  content: string;
};

export default function ChangelogCard({
  version,
  publishedAt,
  content,
}: Props) {
  return (
    <article key={version}>
      <div>
        <div>
          <h2>v{version}</h2>
          {publishedAt && (
            <time>{new Date(publishedAt).toLocaleDateString()}</time>
          )}
        </div>
      </div>

      <div>
        <Markdown>{content}</Markdown>
      </div>
    </article>
  );
}
