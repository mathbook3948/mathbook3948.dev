"use client";

import { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useRef } from "react";

interface AdminWriteToolbarImageProps {
  editor: Editor;
}

const AdminWriteToolbarImage = ({ editor }: AdminWriteToolbarImageProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const onPressedChange = () => {
    if (ref.current) ref.current.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        editor.chain().focus().setImage({ src: base64, alt: file.name }).run();
      };
      reader.readAsDataURL(file);
    }

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleFileSelect}
        hidden
      />
      <Toggle size="sm" pressed={false} onPressedChange={onPressedChange}>
        <ImageIcon className="h-4 w-4" />
      </Toggle>
    </>
  );
};

export default AdminWriteToolbarImage;
