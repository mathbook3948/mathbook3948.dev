"use client";

import { useAdminConfig } from "@/views/admin/config/admin-config-provider";
import { DataTable } from "@/views/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { PostWithCategory } from "@/types/post-interface";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { EllipsisVertical, ImagePlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminConfigPostPagination from "@/views/admin/config/admin-config-post-pagination";
import { useRouter } from "next/navigation";
import deleteAdminPost from "@/actions/post/delete-admin-post";
import { toast } from "sonner";

const AdminConfigPost = () => {
  const { postList, pagination } = useAdminConfig();
  const router = useRouter();

  const columns: ColumnDef<PostWithCategory>[] = [
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
      cell: ({ row }) => <span className="truncate">{row.original.title}</span>,
    },
    {
      id: "lastSaved",
      header: "최종저장일",
      cell: ({ row }) => (
        <span>
          {row.original.updatedAt?.toLocaleString() ?? row.original.createdAt?.toLocaleString()}
        </span>
      ),
    },
    {
      id: "category",
      header: "카테고리",
      cell: ({ row }) => <span>{row.original.category?.name}</span>,
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
              <div className="aspect-video bg-muted/20 rounded-md flex items-center justify-center cursor-pointer">
                <ImagePlus />
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
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                router.push(`/admin/write?post=${row.original.postIdx}`);
              }}>
              수정
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteAdminPost({ postIdx: row.original.postIdx }).then(() => {
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
    <div className=" flex flex-col gap-4 py-4">
      <DataTable columns={columns} data={postList} />
      <AdminConfigPostPagination pagination={pagination!} />
    </div>
  );
};

export default AdminConfigPost;
