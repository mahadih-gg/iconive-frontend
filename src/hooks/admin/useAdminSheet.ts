"use client";

import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export type AdminSheetMode = "create" | "edit" | "view";

export function useAdminSheet() {
  const [params, setParams] = useQueryStates({
    sheet: parseAsStringEnum<AdminSheetMode>(["create", "edit", "view"]),
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

  function openView(viewId: string) {
    void setParams({ sheet: "view", id: viewId });
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
    openView,
    close,
    setParams,
  };
}
