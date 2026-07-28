import { getMeDummy, updateMeDummy } from "@/dummy/users.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { AuthUser } from "@/types/user.type";

export const usersService = {
  getMe: async (): Promise<AuthUser> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(getMeDummy, async () => {
      const { data } = await api.get<AuthUser>("/users/me");
      return data;
    });
  },
  updateMe: async (payload: Partial<AuthUser>): Promise<AuthUser> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => updateMeDummy(payload),
      async () => {
        const { data } = await api.patch<AuthUser>("/users/me", payload);
        return data;
      },
    );
  },
};
