"use client";

import { AuthProvider } from "@/context/AuthContext";
import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Wrappers = ({ children }: { children: React.ReactNode }) => {
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default Wrappers;
