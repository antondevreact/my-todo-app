"use client";

import React from "react";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorProvider } from "./context/ErrorContext";
import { Navigation } from "@/src/components/Navigation";
import { ErrorModal } from "@/components/ErrorModal";
import "./global.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ErrorProvider>
          <html lang="en" data-tailwind="true">
            <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
              <ErrorModal />
              <Navigation />
              <main className="flex-1">{children}</main>
            </body>
          </html>
        </ErrorProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
