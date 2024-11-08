"use client";

import ReactMarkdown, { Components } from "react-markdown";
import { Code } from "./Code";

const components: Partial<Components> = {
  code: Code,
};

interface MarkdownProps {
  children?: string | null;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown className="prose relative" components={components}>
      {children}
    </ReactMarkdown>
  );
}
