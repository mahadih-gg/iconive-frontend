"use client";

import type { ReactNode } from "react";
import { InboxIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";

export interface AdminColumn<T> {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => ReactNode;
  /** Hide on mobile card list */
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
      <div className="flex w-full min-w-0 flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-none" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <Empty className="w-full min-w-0 rounded-none border border-dashed border-border">
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
    <div className="w-full min-w-0 max-w-full">
      <div className="hidden w-full min-w-0 max-w-full overflow-x-auto rounded-none border border-border md:block">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn("truncate", column.className)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn(
                      "max-w-0 overflow-hidden align-middle",
                      column.className,
                    )}
                  >
                    <div className="min-w-0 max-w-full break-words [overflow-wrap:anywhere]">
                      {column.cell(row)}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3 md:hidden">
        {data.map((row) =>
          mobileCard ? (
            <div
              key={row._id}
              className="min-w-0 rounded-none border border-border bg-card p-4"
            >
              {mobileCard(row)}
            </div>
          ) : (
            <div
              key={row._id}
              className="flex min-w-0 flex-col gap-2 rounded-none border border-border bg-card p-4"
            >
              {columns
                .filter((column) => !column.hideOnMobile)
                .map((column) => (
                  <div
                    key={column.key}
                    className="flex min-w-0 items-start justify-between gap-3 text-sm"
                  >
                    <span className="shrink-0 text-muted-foreground">
                      {column.header}
                    </span>
                    <div className="min-w-0 max-w-[65%] break-words text-right [overflow-wrap:anywhere]">
                      {column.cell(row)}
                    </div>
                  </div>
                ))}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
