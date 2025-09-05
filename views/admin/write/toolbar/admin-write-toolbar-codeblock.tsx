"use client";

import { Editor } from "@tiptap/react";
import { Code } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { LANGUAGES } from "@/components/tiptap/codeblock";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface AdminWriteToolbarProps {
  isCodeBlock: boolean;
  editor: Editor;
}

const AdminWriteToolbar = ({ isCodeBlock, editor }: AdminWriteToolbarProps) => {
  const handleToggleCodeBlock = (value: string) => {
    if (isCodeBlock) {
      editor.chain().focus().updateAttributes("codeBlock", { language: value }).run();
    } else {
      editor.chain().focus().setCodeBlock({ language: value }).run();
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Toggle size="sm" pressed={isCodeBlock} asChild>
          <Code />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput />
          <CommandList className="!p-0">
            {LANGUAGES.map((language) => (
              <CommandItem
                key={`language-${language}`}
                value={language}
                onSelect={handleToggleCodeBlock}>
                {language}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AdminWriteToolbar;
