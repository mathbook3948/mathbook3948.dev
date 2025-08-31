import { Category } from "@/types/category-interface";

export interface CategoryConfig extends Category {
  _count: {
    posts: number;
  };
}
