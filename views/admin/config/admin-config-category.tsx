"use client";

import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useAdminConfig } from "@/views/admin/config/admin-config-provider";
import { GripVertical } from "lucide-react";
import { CategoryConfig } from "@/types/config-interface";
import { cn } from "@/lib/utils";
import AdminConfigCategoryDialog from "@/views/admin/config/admin-config-category-dialog";
import { Button } from "@/components/ui/button";
import modifyAdminCategory from "@/actions/category/modify-admin-category";
import { useRouter } from "next/navigation";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const AdminConfigCategory = () => {
  const { categoryList, setCategoryList } = useAdminConfig();
  const router = useRouter();

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    const reordered = reorder<CategoryConfig>(categoryList, source.index, destination.index);
    const withOrder = reordered.map((b, idx) => ({ ...b, sortOrder: idx }));
    setCategoryList(withOrder);
  };

  const handleSave = () => {
    modifyAdminCategory({ categoryList });
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-row items-center justify-end mb-2 gap-2">
        <AdminConfigCategoryDialog />
        <Button type="button" onClick={handleSave}>
          저장
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3 bg-muted p-2 rounded-sm">
              {categoryList.length > 0 ? (
                <>
                  {categoryList.map((b, index) => (
                    <Draggable
                      key={b.category_idx}
                      draggableId={String(b.category_idx)}
                      index={index}>
                      {(provided, dragSnapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}>
                          <div
                            className={cn(
                              "border p-2 rounded-md bg-background",
                              dragSnapshot.isDragging
                                ? "ring-2 ring-primary/40 shadow-md"
                                : "hover:shadow-sm transition-shadow",
                            )}>
                            <div className="flex items-center justify-start gap-2">
                              <GripVertical />
                              <span className="text-sm font-medium">
                                {b.name} ({b._count.posts})
                              </span>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                </>
              ) : (
                <div className="h-20 flex flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/40 bg-muted/30 text-muted-foreground">
                  <span className="text-sm font-medium">카테고리가 없습니다.</span>
                  <span className="text-xs">추가 버튼을 눌러 새 카테고리를 만들어주세요.</span>
                </div>
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default AdminConfigCategory;
