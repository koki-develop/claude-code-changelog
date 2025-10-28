import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header>
        <h1 className="text-3xl">Claude Code Changelog</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
