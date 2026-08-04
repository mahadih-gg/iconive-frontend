"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getProfilePageMeta, PROFILE_NAV } from "./profile-nav";
import { ProfileSidebar } from "./ProfileSidebar";

interface ProfileShellProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export function ProfileShell({ children, title, actions }: ProfileShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const meta = getProfilePageMeta(pathname);
  const pageTitle = title ?? meta.title;

  const mobileValue =
    PROFILE_NAV.find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/profile" && pathname.startsWith(item.href)),
    )?.href ?? "/profile";

  return (
    <div className="bg-background px-4 py-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/profile">Profile</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{meta.crumb}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:hidden">
          <Select
            value={mobileValue}
            onValueChange={(value) => router.push(value)}
          >
            <SelectTrigger className="h-11 w-full rounded-none border-primary-dark/20 bg-[#fffcf8] font-heading text-sm font-semibold tracking-wide uppercase">
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {PROFILE_NAV.map((item) => (
                <SelectItem key={item.href} value={item.href}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {actions}
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <ProfileSidebar />
          </div>

          <div className="min-w-0">
            <div className="mb-4 hidden items-center justify-between gap-3 lg:flex">
              <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                {pageTitle}
              </h1>
              {actions}
            </div>
            <h1 className="font-heading mb-4 text-xl font-semibold tracking-tight text-foreground lg:hidden">
              {pageTitle}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
