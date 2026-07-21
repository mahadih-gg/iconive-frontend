"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/services/users.service";
import type { AuthUser } from "@/types/user.type";
import { queryKeys } from "@/utils/queryKeys";
import { useAuthStore } from "@/store/auth.store";

export function useProfile() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery({
    queryKey: queryKeys.users.me,
    queryFn: () => usersService.getMe(),
    enabled: Boolean(token),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<AuthUser>) => usersService.updateMe(payload),
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(queryKeys.users.me, data);
      toast.success("Profile updated");
    },
    onError: () => toast.error("Could not update profile"),
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
