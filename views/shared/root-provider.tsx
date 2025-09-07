"use client";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { AdminProvider } from "@/views/shared/admin-provider";

interface RootProviderProps {
  children: React.ReactNode;
  accessToken?: string;
}

const RootProvider = ({ children, accessToken }: RootProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider
        value={{
          accessToken,
        }}>
        {children}
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default RootProvider;
