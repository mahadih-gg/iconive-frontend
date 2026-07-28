// DUMMY_DATA: remove when backend is ready
// Maps to POST /customProducts

import { DUMMY_IDS } from "./_ids.dummy";

export function createCustomProductDummy(
  payload: Record<string, unknown> | FormData,
): Record<string, unknown> {
  const body =
    payload instanceof FormData
      ? Object.fromEntries(payload.entries())
      : payload;

  return {
    _id: "649f00000000000000000001",
    userEmail: "demo@iconive.com",
    userId: DUMMY_IDS.user,
    ...body,
  };
}
