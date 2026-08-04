import { adminLoginDummy } from "@/dummy/admin/auth.dummy";
import { delay } from "@/lib/admin/memory-store";

export const adminAuthService = {
  async login(payload: { email: string; password: string }) {
    await delay();
    return adminLoginDummy(payload);
  },
};
