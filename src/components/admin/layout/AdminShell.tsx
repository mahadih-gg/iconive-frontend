"use client";

import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <SidebarProvider className="min-w-0 overflow-x-hidden">
      <AdminSidebar />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <AdminHeader />
        <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-x-hidden p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
