import ReactMarkdown from "react-markdown";

type Props = {
  children: string;
};

export default function Markdown({ children }: Props) {
  return <ReactMarkdown>{children}</ReactMarkdown>;
}
