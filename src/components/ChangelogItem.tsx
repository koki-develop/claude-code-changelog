import { IconExternalLink } from "@tabler/icons-react";
import Markdown from "react-markdown";

type Props = {
  version: string;
  publishedAt: string | null;
  content: string;
};

export default function ChangelogItem({
  version,
  publishedAt,
  content,
}: Props) {
  return (
    <article key={version} className="flex flex-col gap-4">
      <div className="flex items-end justify-between border-b border-gray-200">
        <h2 className="text-2xl">
          <a
            className="flex items-center gap-2"
            href={`https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#${version.replaceAll(".", "")}`}
            target="_blank"
            rel="noreferrer"
          >
            v{version}
            <IconExternalLink className="text-gray-400" size={18} />
          </a>
        </h2>
        {publishedAt && (
          <time
            className="text-gray-500"
            dateTime={new Date(publishedAt).toISOString()}
          >
            {new Date(publishedAt).toLocaleDateString()}
          </time>
        )}
      </div>

      <div className="wrap-break-word">
        <Markdown
          components={{
            ul: ({ children }) => (
              <ul className="list-disc pl-6">{children}</ul>
            ),
            code: ({ children }) => (
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
                {children}
              </code>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </article>
  );
}
