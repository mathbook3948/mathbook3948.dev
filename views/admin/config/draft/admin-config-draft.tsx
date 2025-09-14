"use client";

import { useAdminConfig } from "@/views/admin/config/admin-config-provider";
import { DataTable } from "@/views/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { EllipsisVertical, ImageOff, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import AdminConfigDraftPagination from "@/views/admin/config/draft/admin-config-draft-pagination";
import { PostDraftWithCategory } from "@/types/post-draft-interface";
import deleteAdminPostDraft from "@/actions/admin/post/delete-admin-post-draft";

const AdminConfigDraft = () => {
  const { draftList, pagination } = useAdminConfig();
  const router = useRouter();

  const columns: ColumnDef<PostDraftWithCategory>[] = [
    {
      id: "checkbox",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "제목",
      cell: ({ row }) => <span className="truncate">{row.original.title ?? "-"}</span>,
    },
    {
      id: "lastSaved",
      header: "최종저장일",
      cell: ({ row }) => (
        <span>{format(new Date(row.original.createdAt), "yyyy-MM-dd HH:mm:ss")}</span>
      ),
    },
    {
      id: "category",
      header: "카테고리",
      cell: ({ row }) => <span>{row.original.category?.name ?? "-"}</span>,
    },
    {
      id: "isPublic",
      header: "공개여부",
      cell: ({ row }) => <span>{row.original.isPublic ? "공개" : "비공개"}</span>,
    },
    {
      id: "thumbnail",
      header: () => <span className="flex flex-row justify-center">미리보기</span>,
      cell: ({ row }) => {
        const thumbnail = row.original.thumbnail;

        return (
          <div className="flex flex-row justify-center">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={200}
                height={112.5}
                className="aspect-video rounded-md object-cover"
              />
            ) : (
              <div className="w-[200px] aspect-video bg-muted rounded-md flex items-center justify-center">
                <ImageOff />
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/admin/write?draft=${row.original.postDraftIdx}`);
              }}>
              수정
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                deleteAdminPostDraft({ postDraftIdx: row.original.postDraftIdx }).then(() => {
                  toast.success("삭제에 성공했습니다.");
                  router.refresh();
                });
              }}>
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className=" flex flex-col gap-4 py-4" suppressHydrationWarning>
      <div className="flex flex-row justify-between items-center gap-4">
        <div></div>
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={() => router.push("/admin/write")}>
          <Plus />
          새로운 글
        </Button>
      </div>
      <DataTable columns={columns} data={draftList} />
      <AdminConfigDraftPagination pagination={pagination!} />
    </div>
  );
};

export default AdminConfigDraft;
