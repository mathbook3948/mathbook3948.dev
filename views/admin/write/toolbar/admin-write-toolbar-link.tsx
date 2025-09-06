"use client";

import { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AdminWriteToolbarLinkSchema,
  AdminWriteToolbarLinkSchemaType,
} from "@/schemas/admin-write-toolbar-link-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AdminWriteToolbarProps {
  isLink: boolean;
  editor: Editor;
}

const AdminWriteToolbarLink = ({ isLink, editor }: AdminWriteToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * useForm
   * */
  const form = useForm<AdminWriteToolbarLinkSchemaType>({
    resolver: zodResolver(AdminWriteToolbarLinkSchema),
    defaultValues: {
      href: "",
      target: "_blank",
    },
  });

  const handlePressedChange = () => {
    if (isLink) {
      editor.chain().focus().unsetLink().run();
    } else {
      handleOpenChange(true);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) form.reset();

    setIsOpen(value);
  };

  const handleSubmit = (value: AdminWriteToolbarLinkSchemaType) => {
    editor.chain().focus().setLink({ href: value.href, target: value.target }).run();
    handleOpenChange(false);
  };

  return (
    <>
      <Toggle size="sm" pressed={isLink} onPressedChange={handlePressedChange}>
        <LinkIcon className="h-4 w-4" />
      </Toggle>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>URL 설정</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                form.handleSubmit(handleSubmit)(e);
              }}
              className="space-y-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="URL을 입력하세요..."
                          autoFocus
                          onChange={(e) => field.onChange(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && form.formState.isValid) {
                              e.preventDefault();
                              form.handleSubmit(handleSubmit)();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Label className="text-sm">열기 위치</Label>
                  <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            className="flex flex-row gap-2"
                            onValueChange={field.onChange}
                            value={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem id="t-blank" value="_blank" />
                              <Label htmlFor="t-blank">새 탭</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem id="t-self" value="_self" />
                              <Label htmlFor="t-self">현재 탭</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <Button type="submit">추가</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminWriteToolbarLink;
