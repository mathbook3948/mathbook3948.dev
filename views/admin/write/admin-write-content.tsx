"use client";

import { Editor, EditorContent } from "@tiptap/react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminWriteContentProps {
  editor: Editor | null;
}

const AdminWriteContent = ({ editor }: AdminWriteContentProps) => {
  if (!editor) return null;

  return (
    <ScrollArea className="h-[80vh]">
      <EditorContent editor={editor} className="max-w-4xl" />
    </ScrollArea>
  );
};

export default AdminWriteContent;
