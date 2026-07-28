// DUMMY_DATA: remove when backend is ready
// Maps to GET/PATCH /users/me

import type { AuthUser } from "@/types/user.type";

import { DUMMY_IDS } from "./_ids.dummy";

let currentUser: AuthUser = {
  _id: DUMMY_IDS.user,
  id: DUMMY_IDS.user,
  email: "demo@iconive.com",
  name: "Demo User",
  role: "user",
  isWholeSaler: false,
  phone: "+8801712345678",
  address: "12 Example Street, Dhaka",
};

export function getMeDummy(): AuthUser {
  return { ...currentUser };
}

export function updateMeDummy(payload: Partial<AuthUser>): AuthUser {
  currentUser = { ...currentUser, ...payload };
  return { ...currentUser };
}
