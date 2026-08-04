"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import type { AdminUser } from "@/types/admin";

const ADMIN_JWT_KEY = "admin_jwt";

interface AdminAuthState {
  token: string | null;
  user: AdminUser | null;
  isHydrated: boolean;
  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  devtools(
    persist(
      immer((set) => ({
        token: null,
        user: null,
        isHydrated: false,
        login: (token) =>
          set((state) => {
            state.token = token;
            Cookies.set(ADMIN_JWT_KEY, token);
            try {
              state.user = jwtDecode<AdminUser>(token);
            } catch {
              state.user = null;
            }
          }),
        logout: () =>
          set((state) => {
            state.token = null;
            state.user = null;
            Cookies.remove(ADMIN_JWT_KEY);
          }),
        hydrate: () =>
          set((state) => {
            const token = Cookies.get(ADMIN_JWT_KEY) ?? state.token;
            if (token) {
              state.token = token;
              try {
                const user = jwtDecode<AdminUser>(token);
                if (user.role !== "admin") {
                  state.user = null;
                  state.token = null;
                  Cookies.remove(ADMIN_JWT_KEY);
                } else {
                  state.user = user;
                }
              } catch {
                state.user = null;
                state.token = null;
                Cookies.remove(ADMIN_JWT_KEY);
              }
            }
            state.isHydrated = true;
          }),
      })),
      {
        name: "iconive-admin-auth",
        partialize: (state) => ({ token: state.token }),
      },
    ),
    { name: "AdminAuthStore" },
  ),
);
