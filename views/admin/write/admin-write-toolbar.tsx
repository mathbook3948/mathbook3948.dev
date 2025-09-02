"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { Bold, ImageIcon, Italic, LinkIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface AdminWriteToolbarProps {
  editor: Editor | null;
}

const AdminWriteToolbar = ({ editor }: AdminWriteToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      return {
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isUnderline: editor.isActive("underline"),
        isHeading1: editor.isActive("heading", { level: 1 }),
        isHeading2: editor.isActive("heading", { level: 2 }),
        isHeading3: editor.isActive("heading", { level: 3 }),
        isHeading4: editor.isActive("heading", { level: 4 }),
      };
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Toggle
        size="sm"
        pressed={editorState?.isHeading1}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        H1
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState?.isHeading2}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState?.isHeading3}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        H3
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState?.isHeading4}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        H4
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState?.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState?.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState?.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
          } else {
            const url = window.prompt("링크 URL을 입력하세요");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }
        }}>
        <LinkIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          const url = window.prompt("이미지 URL을 입력하세요");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}>
        <ImageIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default AdminWriteToolbar;
