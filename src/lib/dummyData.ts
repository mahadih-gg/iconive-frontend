import env from "@/lib/env";

// DUMMY_DATA: remove this file when backend is ready
export function withDummyData<T>(
  dummy: T | (() => T | Promise<T>),
  fetcher: () => Promise<T>,
): Promise<T> {
  if (env.isDummyData) {
    const value = typeof dummy === "function" ? (dummy as () => T | Promise<T>)() : dummy;
    return Promise.resolve(value);
  }
  return fetcher();
}
