"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import type { CategoryConfig } from "@/types/config-interface";

interface AdminConfigContextProps {
  categoryList: CategoryConfig[];
  setCategoryList: Dispatch<SetStateAction<CategoryConfig[]>>;
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
      }}>
      {children}
    </AdminConfigContext.Provider>
  );
}
