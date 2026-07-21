import { api } from "@/lib/axios";
import type { LoginPayload, RegisterPayload } from "@/types/user.type";

export const authService = {
  login: async (payload: LoginPayload): Promise<{ token: string }> => {
    const { data } = await api.post<{ token: string }>("/auth/login", payload);
    return data;
  },
  signup: async (payload: RegisterPayload): Promise<{ token: string }> => {
    const { data } = await api.post<{ token: string }>("/auth/signup", payload);
    return data;
  },
};
