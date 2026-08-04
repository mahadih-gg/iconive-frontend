import type { AddressBookEntry } from "@/types/address.type";

export interface AuthUser {
  id?: string;
  _id?: string;
  email?: string;
  name?: string;
  isWholeSaler?: boolean;
  role?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  addresses?: AddressBookEntry[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  verified?: boolean;
}
