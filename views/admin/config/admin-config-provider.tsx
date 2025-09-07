"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import type { CategoryConfig } from "@/types/config-interface";
import { PostWithCategory } from "@/types/post-interface";
import { Pagination } from "@/types/pagination-interface";

interface AdminConfigContextProps {
  categoryList: CategoryConfig[];
  setCategoryList: Dispatch<SetStateAction<CategoryConfig[]>>;
  postList: PostWithCategory[];
  pagination?: Pagination;
}

const AdminConfigContext = createContext<AdminConfigContextProps | undefined>(undefined);

export function useAdminConfig() {
  const ctx = useContext(AdminConfigContext);
  if (!ctx) {
    throw new Error("useAdminConfig must be used within an AdminConfigProvider");
  }
  return ctx;
}

interface AdminConfigProviderProps {
  categoryList: CategoryConfig[];
  postList: PostWithCategory[];
  pagination?: Pagination;
}

export function AdminConfigProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AdminConfigProviderProps;
}) {
  const [categoryList, setCategoryList] = useState<CategoryConfig[]>(value.categoryList);

  useEffect(() => {
    setCategoryList(value.categoryList);
  }, [value.categoryList]);

  return (
    <AdminConfigContext.Provider
      value={{
        categoryList,
        setCategoryList,
        postList: value.postList,
        pagination: value.pagination,
      }}>
      {children}
    </AdminConfigContext.Provider>
  );
}
