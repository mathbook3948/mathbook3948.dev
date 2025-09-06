"use client";

import AdminWriteContent from "@/views/admin/write/admin-write-content";
import { useEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions";
import { AdminWriteSchema, AdminWriteSchemaType } from "@/schemas/admin-write-schema";
import AdminWriteTitle from "@/views/admin/write/admin-write-title";
import { Form } from "@/components/ui/form";
import AdminWriteToolbar from "@/views/admin/write/toolbar/admin-write-toolbar";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import AdminWriteSave from "@/views/admin/write/admin-write-save";
import { useState } from "react";
import AdminWriteDialog from "@/views/admin/write/admin-write-dialog";
import { CodeBlock } from "@/components/tiptap/codeblock";
import { ImageResize } from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file); // data:image/png;base64,... 형태
  });
}

const AdminWrite = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * useForm
   * */
  const form = useForm<AdminWriteSchemaType>({
    resolver: zodResolver(AdminWriteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  /**
   * tiptap 에디터 정의
   * */
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
      Image.configure({
        allowBase64: true,
      }),
      ImageResize.configure({ allowBase64: true }),
    ],
    content: "",
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
      form.setValue("content", editor.getHTML());
    },
  });

  const handleSubmit = async (value: AdminWriteSchemaType) => {
    setIsOpen(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
        <div className="flex flex-col gap-4">
          <AdminWriteTitle form={form} />
          <AdminWriteToolbar editor={editor} />
          <AdminWriteContent editor={editor} />
        </div>
        <AdminWriteSave />
        <AdminWriteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </form>
    </Form>
  );
};

export default AdminWrite;
