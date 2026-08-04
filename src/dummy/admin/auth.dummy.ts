// DUMMY_DATA: admin auth — remove when backend is ready

function toBase64Url(value: string): string {
  if (typeof btoa === "function") {
    return btoa(value)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export const ADMIN_DEMO = {
  email: "admin@iconive.com",
  password: "admin123",
  name: "Admin User",
} as const;

export function createAdminDummyJwt(email = ADMIN_DEMO.email): string {
  const header = toBase64Url(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = toBase64Url(
    JSON.stringify({
      _id: "admin_user_1",
      id: "admin_user_1",
      email,
      name: ADMIN_DEMO.name,
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  );
  return `${header}.${payload}.admin-dummy-signature`;
}

export function adminLoginDummy(payload: {
  email: string;
  password: string;
}): { token: string } {
  if (
    payload.email !== ADMIN_DEMO.email ||
    payload.password !== ADMIN_DEMO.password
  ) {
    throw new Error("Invalid email or password");
  }
  return { token: createAdminDummyJwt(payload.email) };
}
