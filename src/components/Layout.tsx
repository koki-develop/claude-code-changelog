import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Layout({ className, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <header>
        <h1 className="text-center text-3xl">Claude Code Changelog</h1>
      </header>

      <main className={className}>{children}</main>
    </div>
  );
}
