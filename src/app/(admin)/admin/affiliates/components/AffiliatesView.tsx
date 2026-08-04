"use client";

import { useMemo, useState } from "react";
import { PlusIcon } from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";

import { AdminDataTable, type AdminColumn } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

import {
  AffiliateApplicationForm,
  type AffiliateApplicationFormValues,
} from "./AffiliateApplicationForm";
import {
  AffiliateProgramForm,
  type AffiliateProgramFormValues,
} from "./AffiliateProgramForm";

type AffiliateTab = "applications" | "programs";

const DEFAULT_APPLICATION_VALUES: AffiliateApplicationFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  program: "",
  status: "pending",
};

const DEFAULT_PROGRAM_VALUES: AffiliateProgramFormValues = {
  label: "",
  title: "",
  description: "",
  image: "",
  isActive: true,
};

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

  const [deleteTarget, setDeleteTarget] = useState<{
    tab: AffiliateTab;
    id: string;
  } | null>(null);

  const editingApplication = useMemo(
    () =>
      tab === "applications" && sheet.mode === "edit" && sheet.id
        ? applicationsHook.items.find((item) => item._id === sheet.id)
        : undefined,
    [applicationsHook.items, sheet.id, sheet.mode, tab],
  );

  const editingProgram = useMemo(
    () =>
      tab === "programs" && sheet.mode === "edit" && sheet.id
        ? programsHook.items.find((item) => item._id === sheet.id)
        : undefined,
    [programsHook.items, sheet.id, sheet.mode, tab],
  );

  const programOptions = useMemo(
    () => programsHook.items.map((program) => program.title),
    [programsHook.items],
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
        <RowActions
          onEdit={() => sheet.openEdit(row._id)}
          onDelete={() => setDeleteTarget({ tab: "applications", id: row._id })}
        />
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
        <RowActions
          onEdit={() => sheet.openEdit(row._id)}
          onDelete={() => setDeleteTarget({ tab: "programs", id: row._id })}
        />
      ),
    },
  ];

  async function handleApplicationSubmit(values: AffiliateApplicationFormValues) {
    if (sheet.mode === "create") {
      await applicationsHook.create({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        program: values.program,
        status: values.status,
      });
    } else if (sheet.mode === "edit" && sheet.id) {
      await applicationsHook.update(sheet.id, { status: values.status });
    }
    sheet.close();
  }

  async function handleProgramSubmit(values: AffiliateProgramFormValues) {
    if (sheet.mode === "create") {
      await programsHook.create(values);
    } else if (sheet.mode === "edit" && sheet.id) {
      await programsHook.update(sheet.id, values);
    }
    sheet.close();
  }

  function handleTabChange(nextTab: string) {
    sheet.close();
    void setTab(nextTab as AffiliateTab);
  }

  const applicationDefaults: AffiliateApplicationFormValues = editingApplication
    ? {
        name: editingApplication.name,
        email: editingApplication.email,
        phone: editingApplication.phone ?? "",
        message: editingApplication.message,
        program: editingApplication.program,
        status: editingApplication.status,
      }
    : {
        ...DEFAULT_APPLICATION_VALUES,
        program: programOptions[0] ?? "",
      };

  const programDefaults: AffiliateProgramFormValues = editingProgram
    ? {
        label: editingProgram.label,
        title: editingProgram.title,
        description: editingProgram.description,
        image: editingProgram.image,
        isActive: editingProgram.isActive,
      }
    : DEFAULT_PROGRAM_VALUES;

  const isSubmitting =
    tab === "applications"
      ? applicationsHook.isCreating || applicationsHook.isUpdating
      : programsHook.isCreating || programsHook.isUpdating;

  const isDeleting =
    deleteTarget?.tab === "applications"
      ? applicationsHook.isDeleting
      : programsHook.isDeleting;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Affiliates"
        description="Manage affiliate programs and review applications"
        actions={
          <Button
            onClick={() => sheet.openCreate()}
            disabled={tab === "applications" && programOptions.length === 0}
          >
            <PlusIcon data-icon="inline-start" />
            {tab === "applications" ? "Add application" : "Add program"}
          </Button>
        }
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
            emptyDescription="Create affiliate programs for applicants to choose from."
          />
        </TabsContent>
      </Tabs>

      <AdminFormSheet
        open={sheet.isOpen}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={
          tab === "applications"
            ? sheet.mode === "create"
              ? "Create application"
              : "Review application"
            : sheet.mode === "create"
              ? "Create program"
              : "Edit program"
        }
        description={
          tab === "applications"
            ? "Review applicant details and update approval status."
            : "Configure affiliate program content shown on the site."
        }
      >
        {tab === "applications" ? (
          <AffiliateApplicationForm
            key={`app-${sheet.mode}-${sheet.id ?? "new"}`}
            mode={sheet.mode ?? "create"}
            defaultValues={applicationDefaults}
            application={editingApplication}
            programOptions={programOptions}
            onSubmit={handleApplicationSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <AffiliateProgramForm
            key={`prog-${sheet.mode}-${sheet.id ?? "new"}`}
            defaultValues={programDefaults}
            onSubmit={handleProgramSubmit}
            isSubmitting={isSubmitting}
            submitLabel={sheet.mode === "create" ? "Create program" : "Save changes"}
          />
        )}
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title={
          deleteTarget?.tab === "programs" ? "Delete program?" : "Delete application?"
        }
        description="This item will be permanently removed."
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!deleteTarget) return;
          if (deleteTarget.tab === "applications") {
            await applicationsHook.remove(deleteTarget.id);
          } else {
            await programsHook.remove(deleteTarget.id);
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
