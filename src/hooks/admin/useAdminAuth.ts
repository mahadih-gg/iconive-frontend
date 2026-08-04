"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminAuthService } from "@/services/admin/auth.service";
import { useAdminAuthStore } from "@/store/admin-auth.store";

export function useAdminAuth() {
  const token = useAdminAuthStore((s) => s.token);
  const user = useAdminAuthStore((s) => s.user);
  const isHydrated = useAdminAuthStore((s) => s.isHydrated);
  const loginStore = useAdminAuthStore((s) => s.login);
  const logoutStore = useAdminAuthStore((s) => s.logout);
  const hydrate = useAdminAuthStore((s) => s.hydrate);

  const loginMutation = useMutation({
    mutationFn: adminAuthService.login,
    onSuccess: (data) => {
      loginStore(data.token);
      toast.success("Welcome back");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return {
    token,
    user,
    isHydrated,
    isAuthenticated: Boolean(token && user?.role === "admin"),
    hydrate,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutStore,
  };
}
