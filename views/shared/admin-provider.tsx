"use client";

import { createContext, useContext } from "react";
import * as jose from "jose";
import { redirect } from "next/navigation";

interface AdminContextProps {
  isAdmin: boolean;
  adminIdx?: number;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
}

interface AdminProviderProps {
  accessToken?: string;
}

export function AdminProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AdminProviderProps;
}) {
  let isAdmin = false;
  let adminIdx: number | undefined = undefined;

  if (value?.accessToken) {
    try {
      const payload = jose.decodeJwt(value.accessToken) as Record<string, unknown>;
      const raw = payload?.adminIdx as unknown;

      const parsed = typeof raw === "number" ? raw : raw != null ? Number(raw) : undefined;

      if (parsed && Number.isFinite(parsed)) {
        isAdmin = true;
        adminIdx = parsed;
      }
    } catch {
      redirect("/admin/login");
    }
  }

  return <AdminContext.Provider value={{ isAdmin, adminIdx }}>{children}</AdminContext.Provider>;
}
