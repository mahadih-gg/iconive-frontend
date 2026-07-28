// DUMMY_DATA: remove when backend is ready
// Maps to POST /auth/login and POST /auth/signup

import { DUMMY_IDS } from "./_ids.dummy";

function toBase64Url(value: string): string {
  if (typeof btoa === "function") {
    return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Fake JWT decodable by jwt-decode (no signature verification). */
export function createDummyJwt(overrides?: {
  email?: string;
  name?: string;
}): string {
  const header = toBase64Url(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = toBase64Url(
    JSON.stringify({
      _id: DUMMY_IDS.user,
      id: DUMMY_IDS.user,
      email: overrides?.email ?? "demo@iconive.com",
      name: overrides?.name ?? "Demo User",
      role: "user",
      isWholeSaler: false,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  );
  return `${header}.${payload}.dummy-signature`;
}

export function loginDummy(payload: { email: string; password: string }): {
  token: string;
} {
  return {
    token: createDummyJwt({ email: payload.email, name: "Demo User" }),
  };
}

export function signupDummy(payload: {
  email: string;
  name?: string;
}): { token: string } {
  return {
    token: createDummyJwt({
      email: payload.email,
      name: payload.name ?? "New User",
    }),
  };
}
