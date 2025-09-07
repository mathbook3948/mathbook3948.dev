export interface Category {
  categoryIdx: number;
  name: string;
  isPublic: boolean;
  sortOrder: number;

  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
