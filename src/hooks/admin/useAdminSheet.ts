"use client";

import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export type AdminSheetMode = "create" | "edit";

export function useAdminSheet() {
  const [params, setParams] = useQueryStates({
    sheet: parseAsStringEnum<AdminSheetMode>(["create", "edit"]),
    id: parseAsString,
  });

  const isOpen = params.sheet !== null;
  const mode = params.sheet;
  const id = params.id;

  function openCreate() {
    void setParams({ sheet: "create", id: null });
  }

  function openEdit(editId: string) {
    void setParams({ sheet: "edit", id: editId });
  }

  function close() {
    void setParams({ sheet: null, id: null });
  }

  return {
    isOpen,
    mode,
    id,
    openCreate,
    openEdit,
    close,
    setParams,
  };
}
