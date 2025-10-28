import { useState, type ReactNode } from "react";

type Props = {
  value: string;
  children: (params: { copied: boolean }) => ReactNode;
};

export default function CopyButton({ value, children }: Props) {
  const [copiedCount, setCopiedCount] = useState<number>(0);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopiedCount((prev) => prev + 1);
    setTimeout(() => setCopiedCount((prev) => prev - 1), 2000);
  };

  return (
    <button className="cursor-pointer" onClick={handleCopy}>
      {children({
        copied: copiedCount > 0,
      })}
    </button>
  );
}
