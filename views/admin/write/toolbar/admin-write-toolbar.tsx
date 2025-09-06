"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { Bold, ImageIcon, Italic, UnderlineIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import AdminWriteToolbarCodeblock from "@/views/admin/write/toolbar/admin-write-toolbar-codeblock";
import AdminWriteToolbarLink from "@/views/admin/write/toolbar/admin-write-toolbar-link";

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
        isCodeBlock: editor.isActive("codeBlock"),
        isLink: editor.isActive("link"),
      };
    },
  });

  if (!editor) return null;

  const handleToggleCodeBlock = (value: string) => {
    if (editor.isActive("codeBlock")) {
      // 이미 코드블럭이면 언어만 변경
      editor.chain().focus().updateAttributes("codeBlock", { language: value }).run();
    } else {
      // 코드블럭이 아니면 새로 생성
      editor.chain().focus().setCodeBlock({ language: value }).run();
    }
  };

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
      <AdminWriteToolbarLink isLink={editorState?.isLink ?? false} editor={editor} />
      <AdminWriteToolbarCodeblock isCodeBlock={editorState?.isCodeBlock ?? false} editor={editor} />
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
