import { api } from "@/lib/axios";

export async function fetcher<T>(url: string): Promise<T> {
  const { data } = await api.get<T>(url);
  return data;
}
