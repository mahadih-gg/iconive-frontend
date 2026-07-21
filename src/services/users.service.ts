import { api } from "@/lib/axios";
import type { AuthUser } from "@/types/user.type";

export const usersService = {
  getMe: async (): Promise<AuthUser> => {
    const { data } = await api.get<AuthUser>("/users/me");
    return data;
  },
  updateMe: async (payload: Partial<AuthUser>): Promise<AuthUser> => {
    const { data } = await api.patch<AuthUser>("/users/me", payload);
    return data;
  },
};
