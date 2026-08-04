/** Simple in-memory CRUD store for admin dummy data. */

export function createMemoryStore<T extends { _id: string }>(
  initial: T[],
) {
  let items = [...initial];

  return {
    list(): T[] {
      return [...items];
    },
    get(id: string): T | undefined {
      return items.find((item) => item._id === id);
    },
    create(data: Omit<T, "_id"> & { _id?: string }): T {
      const item = {
        ...data,
        _id: data._id ?? `admin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      } as T;
      items = [item, ...items];
      return item;
    },
    update(id: string, patch: Partial<T>): T {
      const index = items.findIndex((item) => item._id === id);
      if (index === -1) throw new Error("Not found");
      const updated = { ...items[index], ...patch, _id: id };
      items = [...items.slice(0, index), updated, ...items.slice(index + 1)];
      return updated;
    },
    remove(id: string): void {
      items = items.filter((item) => item._id !== id);
    },
    replace(next: T[]): void {
      items = [...next];
    },
  };
}

export function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
