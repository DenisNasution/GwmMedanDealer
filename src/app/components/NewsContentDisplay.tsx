// components/NewsContentDisplay.tsx
"use client";

import { useEffect, useState } from "react";

interface NewsContentDisplayProps {
  content: string;
  className?: string;
}

export default function NewsContentDisplay({
  content,
  className = "",
}: NewsContentDisplayProps) {
  const [formattedContent, setFormattedContent] = useState("");

  useEffect(() => {
    const formatContent = (text: string) => {
      if (!text) return "";
      // If content is already HTML, use it directly
      if (text.includes("<") && text.includes(">")) {
        return text;
      }
      // Process line by line for better control
      const lines = text.split("\n");
      let output = "";
      let inOrderedList = false;
      let inUnorderedList = false;
      let listItems = "";

      // Function to process markdown formatting in a line
      const processMarkdown = (line: string) => {
        let processed = line;

        // Bold: **text** or __text__
        processed = processed.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold text-gray-900">$1</strong>'
        );
        processed = processed.replace(
          /__(.*?)__/g,
          '<strong class="font-semibold text-gray-900">$1</strong>'
        );

        // Italic: *text* or _text_
        processed = processed.replace(
          /\*(.*?)\*/g,
          '<em class="italic text-gray-800">$1</em>'
        );
        processed = processed.replace(
          /_(.*?)_/g,
          '<em class="italic text-gray-800">$1</em>'
        );

        // Code: `text`
        processed = processed.replace(
          /`(.*?)`/g,
          '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
        );

        // Links: [text](url)
        processed = processed.replace(
          /\[([^\[]+)\]\(([^\)]+)\)/g,
          '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener">$1</a>'
        );

        return processed;
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
          // Close any open lists
          if (inOrderedList) {
            output += `<ol class="list-decimal ml-6 my-4 space-y-2">${listItems}</ol>`;
            inOrderedList = false;
            listItems = "";
          } else if (inUnorderedList) {
            output += `<ul class="list-disc ml-6 my-4 space-y-2">${listItems}</ul>`;
            inUnorderedList = false;
            listItems = "";
          }
          continue;
        }

        // Check for numbered list item
        if (/^\d+\.\s+/.test(line)) {
          const content = processMarkdown(line.replace(/^\d+\.\s+/, ""));
          listItems += `<li class="mb-2 pl-2">${content}</li>`;

          if (!inOrderedList) {
            inOrderedList = true;
            // Close unordered list if it was open
            if (inUnorderedList) {
              output += `<ul class="list-disc ml-6 my-4 space-y-2">${listItems}</ul>`;
              inUnorderedList = false;
              listItems = "";
            }
          }
        }
        // Check for bullet list item
        else if (/^-\s+/.test(line)) {
          const content = processMarkdown(line.replace(/^-\s+/, ""));
          listItems += `<li class="mb-2 pl-2">${content}</li>`;

          if (!inUnorderedList) {
            inUnorderedList = true;
            // Close ordered list if it was open
            if (inOrderedList) {
              output += `<ol class="list-decimal ml-6 my-4 space-y-2">${listItems}</ol>`;
              inOrderedList = false;
              listItems = "";
            }
          }
        }
        // Check for headings
        else if (/^#+ /.test(line)) {
          // Close any open lists
          if (inOrderedList) {
            output += `<ol class="list-decimal ml-6 my-4 space-y-2">${listItems}</ol>`;
            inOrderedList = false;
            listItems = "";
          } else if (inUnorderedList) {
            output += `<ul class="list-disc ml-6 my-4 space-y-2">${listItems}</ul>`;
            inUnorderedList = false;
            listItems = "";
          }

          // Process headings
          const processedLine = processMarkdown(line);
          if (line.startsWith("##### ")) {
            output += `<h5 class="text-lg font-bold mt-6 mb-2 text-gray-900">${processedLine.replace(
              /^##### /,
              ""
            )}</h5>`;
          } else if (line.startsWith("#### ")) {
            output += `<h4 class="text-xl font-bold mt-6 mb-2 text-gray-900">${processedLine.replace(
              /^#### /,
              ""
            )}</h4>`;
          } else if (line.startsWith("### ")) {
            output += `<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">${processedLine.replace(
              /^### /,
              ""
            )}</h3>`;
          } else if (line.startsWith("## ")) {
            output += `<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">${processedLine.replace(
              /^## /,
              ""
            )}</h2>`;
          } else if (line.startsWith("# ")) {
            output += `<h1 class="text-3xl font-bold mt-10 mb-5 text-gray-900">${processedLine.replace(
              /^# /,
              ""
            )}</h1>`;
          }
        }
        // Regular content
        else {
          // Close any open lists
          if (inOrderedList) {
            output += `<ol class="list-decimal ml-6 my-4 space-y-2">${listItems}</ol>`;
            inOrderedList = false;
            listItems = "";
          } else if (inUnorderedList) {
            output += `<ul class="list-disc ml-6 my-4 space-y-2">${listItems}</ul>`;
            inUnorderedList = false;
            listItems = "";
          }

          // Add regular paragraph with markdown processing
          const processedLine = processMarkdown(line);
          output += `<p class="mb-4 leading-relaxed text-gray-700">${processedLine}</p>`;
        }
      }

      // Close any remaining open lists at the end
      if (inOrderedList) {
        output += `<ol class="list-decimal ml-6 my-4 space-y-2">${listItems}</ol>`;
      } else if (inUnorderedList) {
        output += `<ul class="list-disc ml-6 my-4 space-y-2">${listItems}</ul>`;
      }

      return output;
    };

    setFormattedContent(formatContent(content));
  }, [content]);

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
}
