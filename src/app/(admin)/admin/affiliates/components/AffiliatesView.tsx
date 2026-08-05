"use client";

import { useMemo } from "react";
import { parseAsStringEnum, useQueryState } from "nuqs";

import { AdminDataTable, type AdminColumn } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminAffiliateApplications,
  useAdminAffiliatePrograms,
} from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate } from "@/utils/formatters";
import type {
  AdminAffiliateApplication,
  AdminAffiliateProgram,
} from "@/types/admin";

import { AffiliateApplicationDetail } from "./AffiliateApplicationDetail";
import { AffiliateProgramDetail } from "./AffiliateProgramDetail";

type AffiliateTab = "applications" | "programs";

export function AffiliatesView() {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringEnum<AffiliateTab>(["applications", "programs"]).withDefault(
      "applications",
    ),
  );

  const applicationsHook = useAdminAffiliateApplications();
  const programsHook = useAdminAffiliatePrograms();
  const sheet = useAdminSheet();

  const viewingApplication = useMemo(
    () =>
      tab === "applications" && sheet.mode === "view" && sheet.id
        ? applicationsHook.items.find((item) => item._id === sheet.id)
        : undefined,
    [applicationsHook.items, sheet.id, sheet.mode, tab],
  );

  const viewingProgram = useMemo(
    () =>
      tab === "programs" && sheet.mode === "view" && sheet.id
        ? programsHook.items.find((item) => item._id === sheet.id)
        : undefined,
    [programsHook.items, sheet.id, sheet.mode, tab],
  );

  const applicationColumns: AdminColumn<AdminAffiliateApplication>[] = [
    {
      key: "name",
      header: "Name",
      cell: (row) => row.name,
    },
    {
      key: "email",
      header: "Email",
      hideOnMobile: true,
      cell: (row) => row.email,
    },
    {
      key: "phone",
      header: "Phone",
      hideOnMobile: true,
      cell: (row) => row.phone ?? "—",
    },
    {
      key: "message",
      header: "Message",
      cell: (row) => (
        <span className="line-clamp-2 max-w-xs text-sm">{row.message}</span>
      ),
    },
    {
      key: "program",
      header: "Program",
      cell: (row) => row.program,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      header: "Created",
      hideOnMobile: true,
      cell: (row) => formatAdminDate(row.createdAt),
    },
    {
      key: "actions",
      header: "",
      className: "w-12 text-right",
      cell: (row) => (
        <RowActions onView={() => sheet.openView(row._id)} />
      ),
    },
  ];

  const programColumns: AdminColumn<AdminAffiliateProgram>[] = [
    {
      key: "label",
      header: "Label",
      cell: (row) => row.label,
    },
    {
      key: "title",
      header: "Title",
      cell: (row) => row.title,
    },
    {
      key: "description",
      header: "Description",
      hideOnMobile: true,
      cell: (row) => (
        <span className="line-clamp-2 max-w-xs text-sm">{row.description}</span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      cell: (row) => (
        <Badge variant={row.isActive ? "default" : "outline"} className="rounded-none">
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-12 text-right",
      cell: (row) => (
        <RowActions onView={() => sheet.openView(row._id)} />
      ),
    },
  ];

  function handleTabChange(nextTab: string) {
    sheet.close();
    void setTab(nextTab as AffiliateTab);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Affiliates"
        description="Browse affiliate programs and applications"
      />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-4">
          <AdminDataTable
            columns={applicationColumns}
            data={applicationsHook.items}
            isLoading={applicationsHook.isLoading}
            emptyTitle="No applications"
            emptyDescription="Affiliate applications will appear here."
          />
        </TabsContent>

        <TabsContent value="programs" className="mt-4">
          <AdminDataTable
            columns={programColumns}
            data={programsHook.items}
            isLoading={programsHook.isLoading}
            emptyTitle="No programs"
            emptyDescription="Affiliate programs will appear here."
          />
        </TabsContent>
      </Tabs>

      <AdminFormSheet
        open={sheet.isOpen && sheet.mode === "view"}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={
          tab === "applications" ? "View application" : "View program"
        }
        description={
          tab === "applications"
            ? "Full affiliate application details."
            : "Full affiliate program details."
        }
        mode="view"
        hideSubmit
        cancelLabel="Close"
      >
        {tab === "applications" && viewingApplication ? (
          <AffiliateApplicationDetail application={viewingApplication} />
        ) : null}
        {tab === "programs" && viewingProgram ? (
          <AffiliateProgramDetail program={viewingProgram} />
        ) : null}
      </AdminFormSheet>
    </div>
  );
}
