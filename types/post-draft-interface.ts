import { Category } from "@/types/category-interface";

export interface PostDraft {
  postDraftIdx: number;
  categoryIdx: number;
  title: string;
  content: string;
  thumbnail: string | null;
  isPublic: boolean;
  createdAt: Date;
}

export interface PostDraftWithCategory extends PostDraft {
  category: Category;
}
