import { useEditor, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { CodeBlock } from "@/components/tiptap/codeblock";
import Image from "@tiptap/extension-image";

interface UseCustomEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: UseEditorOptions;
}

export const useCustomEditor = ({ value = "", onChange, options }: UseCustomEditorProps = {}) => {
  return useEditor({
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
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "mx-auto w-full h-auto",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        class: "min-h-[370px] focus:!outline-none",
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
      onChange?.(editor.getHTML());
    },
    ...options,
  });
};
