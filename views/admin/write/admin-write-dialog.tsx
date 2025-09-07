"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";
import Image from "next/image";
import { ChevronDown, Globe, GlobeLock, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/category-interface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem } from "@/components/ui/command";
import { CommandList } from "cmdk";
import getAdminCategoryList from "@/actions/category/get-admin-category-list";
import registAdminPost from "@/actions/post/regist-admin-post";
import modifyAdminPost from "@/actions/post/modify-admin-post";

interface AdminWriteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  form: UseFormReturn<AdminWriteSchemaType>;
}

const AdminWriteDialog = ({ isOpen, setIsOpen, form }: AdminWriteDialogProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const thumbnail = form.watch("thumbnail") || undefined;
  const isPublic = form.watch("isPublic");
  const categoryIdx = form.watch("categoryIdx");

  useEffect(() => {
    getAdminCategoryList().then((c) => {
      setCategories(c);
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        form.setValue("thumbnail", reader.result, { shouldValidate: true });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCategoryOpenChange = async (value: boolean) => {
    if (value) {
      if (categories.length === 0) {
        const categoryList = await getAdminCategoryList();
        setCategories(categoryList);
      }
    }

    setIsCategoryOpen(value);
  };

  const handleSave = async () => {
    const value = form.getValues();

    if (value.postIdx) {
      modifyAdminPost(value);
    } else {
      registAdminPost(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시글 설정</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Label>미리보기 설정</Label>
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={400}
                height={225}
                className="aspect-video rounded-md object-cover"
              />
            ) : (
              <div className="aspect-video bg-muted/20 rounded-md flex items-center justify-center cursor-pointer">
                <ImagePlus />
              </div>
            )}

            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
            <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()}>
              썸네일 업로드
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Label>공개 설정</Label>
            <div className="flex flex-row gap-4">
              <Button
                variant={isPublic ? "default" : "outline"}
                onClick={() => {
                  form.setValue("isPublic", true);
                }}>
                <Globe /> 전체 공개
              </Button>
              <Button
                variant={isPublic ? "outline" : "default"}
                className="flex-1"
                onClick={() => {
                  form.setValue("isPublic", false);
                }}>
                <GlobeLock /> 비공개
              </Button>
            </div>
            <Label>카테고리 설정</Label>
            <Popover open={isCategoryOpen} onOpenChange={handleCategoryOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start items-center w-full truncate cursor-pointer">
                  <ChevronDown />
                  {categories.find((c) => c.categoryIdx === categoryIdx)?.name ?? "카테고리 선택"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0 w-[280px]">
                <Command>
                  <CommandInput placeholder="카테고리 검색..." />
                  <CommandEmpty>결과 없음</CommandEmpty>
                  <CommandList>
                    {categories.map((category) => (
                      <CommandItem
                        key={`category-${category.categoryIdx}`}
                        value={String(category.categoryIdx)}
                        keywords={[category.name]}
                        onSelect={(val) => {
                          const idx = Number(val);
                          form.setValue("categoryIdx", idx, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          setIsCategoryOpen(false);
                        }}>
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex-1 flex flex-row justify-end gap-2">
              <Button variant="secondary" className="cursor-pointer">
                임시저장
              </Button>
              <Button className="cursor-pointer" onClick={handleSave}>
                저장
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminWriteDialog;
