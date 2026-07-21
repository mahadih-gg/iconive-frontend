"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type { LoginPayload, RegisterPayload } from "@/types/user.type";

export function useAuth() {
  const { token, user, isHydrated, login, logout, setUser, hydrate } =
    useAuthStore(
      useShallow((s) => ({
        token: s.token,
        user: s.user,
        isHydrated: s.isHydrated,
        login: s.login,
        logout: s.logout,
        setUser: s.setUser,
        hydrate: s.hydrate,
      })),
    );

  useEffect(() => {
    if (!isHydrated) hydrate();
  }, [isHydrated, hydrate]);

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      login(data.token);
      toast.success("Logged in successfully");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.signup(payload),
    onSuccess: (data) => {
      login(data.token);
      toast.success("Account created successfully");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Registration failed");
    },
  });

  return {
    token,
    user,
    setUser,
    isAuthenticated: Boolean(token && user),
    isLoading: !isHydrated,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    login: (payload: LoginPayload) => loginMutation.mutateAsync(payload),
    register: (payload: RegisterPayload) => registerMutation.mutateAsync(payload),
    logout: () => {
      logout();
      toast.success("Logged out");
    },
    loginWithToken: (jwt: string) => login(jwt),
  };
}
