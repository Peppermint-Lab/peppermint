import React from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownPreview({ data }) {
  return (
    <div className="container">
      <MDEditor.Markdown 
        source={data} 
        rehypePlugins={[[rehypeSanitize]]}
      />
    </div>
  );
}