export interface Post {
  postIdx: number;
  categoryIdx: number;
  title: string;
  content: string;
  views: number;
  isPublic: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
