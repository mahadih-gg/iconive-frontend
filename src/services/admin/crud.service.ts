import { delay, type createMemoryStore } from "@/lib/admin/memory-store";

type MemoryStore<T extends { _id: string }> = ReturnType<
  typeof createMemoryStore<T>
>;

export function createCrudService<T extends { _id: string }>(
  store: MemoryStore<T>,
  withCreatedAt = true,
) {
  return {
    async list(): Promise<T[]> {
      await delay();
      return store.list();
    },
    async get(id: string): Promise<T | undefined> {
      await delay();
      return store.get(id);
    },
    async create(data: Partial<T> & Record<string, unknown>): Promise<T> {
      await delay();
      const payload = {
        ...data,
        ...(withCreatedAt
          ? {
              createdAt:
                (data as { createdAt?: string }).createdAt ??
                new Date().toISOString(),
            }
          : {}),
      };
      return store.create(payload as Omit<T, "_id"> & { _id?: string });
    },
    async update(id: string, data: Partial<T>): Promise<T> {
      await delay();
      return store.update(id, data);
    },
    async remove(id: string): Promise<void> {
      await delay();
      store.remove(id);
    },
  };
}
