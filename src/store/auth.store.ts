"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import type { AuthUser } from "@/types/user.type";

const JWT_KEY = "jwt";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
  setToken: (token: string) => void;
  setUser: (user: AuthUser | null) => void;
  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set) => ({
        token: null,
        user: null,
        isHydrated: false,
        setToken: (token) =>
          set((state) => {
            state.token = token;
            Cookies.set(JWT_KEY, token);
          }),
        setUser: (user) =>
          set((state) => {
            state.user = user;
          }),
        login: (token) =>
          set((state) => {
            state.token = token;
            Cookies.set(JWT_KEY, token);
            try {
              state.user = jwtDecode<AuthUser>(token);
            } catch {
              state.user = null;
            }
          }),
        logout: () =>
          set((state) => {
            state.token = null;
            state.user = null;
            Cookies.remove(JWT_KEY);
          }),
        hydrate: () =>
          set((state) => {
            const token = Cookies.get(JWT_KEY) ?? state.token;
            if (token) {
              state.token = token;
              try {
                state.user = jwtDecode<AuthUser>(token);
              } catch {
                state.user = null;
                state.token = null;
                Cookies.remove(JWT_KEY);
              }
            }
            state.isHydrated = true;
          }),
      })),
      {
        name: "iconive-auth",
        partialize: (state) => ({ token: state.token }),
      },
    ),
    { name: "AuthStore" },
  ),
);
