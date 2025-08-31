export interface Category {
  category_idx: number;
  name: string;
  isPublic: boolean;
  sortOrder: number;

  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
