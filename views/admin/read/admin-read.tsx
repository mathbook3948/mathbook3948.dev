"use client";

import { PostWithCategory } from "@/types/post-interface";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { CodeBlock } from "@/components/tiptap/codeblock";
import Image from "@tiptap/extension-image";
import { ImageResize } from "tiptap-extension-resize-image";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface AdminReadProps {
  post: PostWithCategory;
}

const AdminRead = ({ post }: AdminReadProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https"],
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-700 underline underline-offset-2",
        },
      }),
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      TextStyle,
      FontSize,
      CodeBlock,
      ImageResize.configure({ allowBase64: true, inline: true }),
    ],
    content: post.content,
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        class: "min-h-[370px] focus:!outline-none",
        spellcheck: "false",
      },
    },
  });

  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="min-w-0 truncate focus:truncate-0 text-4xl font-bold placeholder-muted-foreground outline-none">
          {post.title}
        </span>
        <span className="px-1 text-muted-foreground text-sm">
          {format(new Date(post.updatedAt ?? post.createdAt), "yyyy-MM-dd HH:mm")}
        </span>

        <Separator className="my-4" />

        <EditorContent editor={editor} className="max-w-4xl" />
      </div>
    </>
  );
};

export default AdminRead;
