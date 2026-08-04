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
  dateOfBirth: "1995-06-12",
  gender: "Female",
  addresses: [
    {
      id: "addr-home",
      label: "Home",
      street: "12 Example Street",
      country: "BD",
      state: "13",
      city: "Dhaka",
      postalCode: "1207",
    },
    {
      id: "addr-work",
      label: "Work",
      street: "45 Gulshan Avenue",
      country: "BD",
      state: "13",
      city: "Dhaka",
      postalCode: "1212",
    },
  ],
};

export function getMeDummy(): AuthUser {
  return {
    ...currentUser,
    addresses: currentUser.addresses?.map((a) => ({ ...a })),
  };
}

export function updateMeDummy(payload: Partial<AuthUser>): AuthUser {
  currentUser = {
    ...currentUser,
    ...payload,
    addresses: payload.addresses
      ? payload.addresses.map((a) => ({ ...a }))
      : currentUser.addresses,
  };
  return getMeDummy();
}
