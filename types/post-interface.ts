import { Category } from "@/types/category-interface";

export interface Post {
  postIdx: number;
  categoryIdx: number;
  title: string;
  content: string;
  views: number;
  thumbnail: string | null;
  isPublic: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface PostWithCategory extends Post {
  category: Category;
}
