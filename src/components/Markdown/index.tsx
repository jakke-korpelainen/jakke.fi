"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import { Code } from "./Code";

const components: Partial<Components> = {
  code: Code,
};

interface MarkdownProps {
  children?: string | null;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <div className="prose relative">
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
