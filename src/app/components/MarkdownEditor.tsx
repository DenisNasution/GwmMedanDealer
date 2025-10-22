// components/MarkdownEditor.tsx - WITH CUSTOM PLACEHOLDER
"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your news content in markdown...",
}: MarkdownEditorProps) {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (newValue: string | undefined) => {
    const finalValue = newValue || "";
    setEditorValue(finalValue);
    onChange(finalValue);
  };

  // Show placeholder text when empty
  return (
    <div className="markdown-editor-container">
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={handleEditorChange}
          height={400}
          preview="edit"
          visibleDragbar={false}
        />
      </div>

      {/* Show placeholder hint */}
      {editorValue === "" && (
        <div className="mt-2 text-sm text-gray-500 italic">{placeholder}</div>
      )}

      {/* Markdown Cheatsheet */}
      <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
        <p className="font-medium mb-2">Markdown Tips:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <strong>**Bold**</strong> - Bold text
          </div>
          <div>
            <em>*Italic*</em> - Italic text
          </div>
          <div>
            <code>`Code`</code> - Inline code
          </div>
          <div># Heading 1</div>
          <div>- List item</div>
          <div>1. Numbered item</div>
          <div>[Link](url)</div>
          <div>![Image](url)</div>
        </div>
      </div>
    </div>
  );
}
