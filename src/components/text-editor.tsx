/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TextEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

// Dynamic import TinyMCE để tránh SSR lỗi
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

interface TextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  height?: number;
}

export default function TextEditor({
  value = "",
  onChange,
  height = 300,
}: TextEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.getContent());
    }
  };

  return (
    <Editor
      apiKey="eqeoaslfi6p73buk0u3j5kb22b8jwx08nlo1zan6odqlzvbj" // key free
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value}
      init={{
        height: height,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace code fullscreen",
          "insertdatetime media table paste help wordcount",
        ],
        toolbar:
          "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | removeformat | help",
        base_url: "https://cdn.tiny.cloud/1/",
        suffix: ".min",
        setup: (editor: any) => {
          editor.on("Change KeyUp", handleEditorChange);
        },
      }}
    />
  );
}
