"use client";

import { PostWithCategory } from "@/types/post-interface";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { CodeBlock } from "@/components/tiptap/codeblock";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Image from "@tiptap/extension-image";
import { useCustomEditor } from "@/hooks/use-custom-editor";

interface AdminReadProps {
  post: PostWithCategory;
}

const AdminRead = ({ post }: AdminReadProps) => {
  const editor = useCustomEditor({ value: post.content, options: { editable: false } });

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

        <EditorContent editor={editor} className="w-full sm:max-w-4xl" />
      </div>
    </>
  );
};

export default AdminRead;
