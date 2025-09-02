"use client";

import AdminWriteContent from "@/views/admin/write/admin-write-content";
import { useEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions";
import Image from "@tiptap/extension-image";
import { AdminWriteSchema, AdminWriteSchemaType } from "@/schemas/admin-write-schema";
import AdminWriteTitle from "@/views/admin/write/admin-write-title";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AdminWriteToolbar from "@/views/admin/write/admin-write-toolbar";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";

const AdminWrite = () => {
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
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      TextStyle,
      FontSize,
    ],
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
      form.setValue("content", editor.getHTML());
    },
  });

  const handleSubmit = async (value: AdminWriteSchemaType) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mx-auto flex flex-col gap-4">
          <AdminWriteTitle form={form} />
          <AdminWriteToolbar editor={editor} />
          <AdminWriteContent editor={editor} />
        </div>
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
};

export default AdminWrite;
