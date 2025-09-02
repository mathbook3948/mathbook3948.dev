"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminWrite = () => {
  const extensions = useMemo(
    () => [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content: "",
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        class: "min-h-[400px] focus:!outline-none",
        spellcheck: "false",
      },
      handlePaste: function (view, event) {
        event.preventDefault();
        const text = event.clipboardData?.getData("text/plain");
        if (text) {
          view.dispatch(view.state.tr.insertText(text));
        }
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      // 디버그용: 입력되면 여기 계속 호출됨
      // console.log(editor.getText());
    },
  });

  if (!editor) return null;

  return (
    <div className="mx-auto">
      <ScrollArea className="h-[80vh]">
        <EditorContent editor={editor} className="max-w-4xl" />
      </ScrollArea>
    </div>
  );
};

export default AdminWrite;
