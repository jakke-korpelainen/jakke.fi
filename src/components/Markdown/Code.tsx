"use client";

import { useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { zTouch as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Embed } from "./Embed";

const useClipboard = () => {
  const [text, setText] = useState<string | undefined>();
  const copy = useCallback(async (text: string) => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(text);
    }
    setText("✅");
    setTimeout(() => {
      setText(undefined);
    }, 500);
  }, []);

  return [copy, text] as const;
};

export function Code({ className, children }: any) {
  const [copy, text] = useClipboard();

  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1];
  if (language === "embed") {
    return <Embed children={children} />;
  }

  return (
    <div className="relative grid">
      <SyntaxHighlighter
        showLineNumbers
        codeTagProps={{
          style: { fontFamily: "var(--font-mono)" },
        }}
        style={theme}
        language={language}
      >
        {children}
      </SyntaxHighlighter>
      {copy && (
        <button
          disabled={!!text}
          className="absolute right-5 top-5 hidden sm:block"
          type="button"
          onClick={() => copy(children)}
        >
          {text ?? "Copy"}
        </button>
      )}
    </div>
  );
}
