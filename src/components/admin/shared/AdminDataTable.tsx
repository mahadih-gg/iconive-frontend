"use client";

import type { ReactNode } from "react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InboxIcon } from "lucide-react";

export interface AdminColumn<T> {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => ReactNode;
  /** Hide on mobile table; show in mobile card */
  hideOnMobile?: boolean;
}

interface AdminDataTableProps<T extends { _id: string }> {
  columns: AdminColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  mobileCard?: (row: T) => ReactNode;
}

export function AdminDataTable<T extends { _id: string }>({
  columns,
  data,
  isLoading,
  emptyTitle = "No results",
  emptyDescription = "Try adjusting filters or create a new item.",
  mobileCard,
}: AdminDataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-none" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <Empty className="rounded-none border border-dashed border-border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>{emptyTitle}</EmptyTitle>
          <EmptyDescription>{emptyDescription}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-none border border-border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {data.map((row) =>
          mobileCard ? (
            <div
              key={row._id}
              className="rounded-none border border-border bg-card p-4"
            >
              {mobileCard(row)}
            </div>
          ) : (
            <div
              key={row._id}
              className="flex flex-col gap-2 rounded-none border border-border bg-card p-4"
            >
              {columns
                .filter((column) => !column.hideOnMobile)
                .map((column) => (
                  <div
                    key={column.key}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">{column.header}</span>
                    <div className="text-right">{column.cell(row)}</div>
                  </div>
                ))}
            </div>
          ),
        )}
      </div>
    </>
  );
}
