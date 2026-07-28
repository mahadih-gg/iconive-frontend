import { loginDummy, signupDummy } from "@/dummy/auth.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { LoginPayload, RegisterPayload } from "@/types/user.type";

export const authService = {
  login: async (payload: LoginPayload): Promise<{ token: string }> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => loginDummy(payload),
      async () => {
        const { data } = await api.post<{ token: string }>("/auth/login", payload);
        return data;
      },
    );
  },
  signup: async (payload: RegisterPayload): Promise<{ token: string }> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => signupDummy(payload),
      async () => {
        const { data } = await api.post<{ token: string }>("/auth/signup", payload);
        return data;
      },
    );
  },
};
