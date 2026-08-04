"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface CrudService<T, TCreate, TUpdate> {
  list: () => Promise<T[]>;
  get?: (id: string) => Promise<T | undefined>;
  create: (data: TCreate) => Promise<T>;
  update: (id: string, data: TUpdate) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

interface CrudHookOptions {
  queryKey: QueryKey;
  resourceName: string;
}

export function createAdminCrudHook<
  T extends { _id: string },
  TCreate = Partial<T> & Record<string, unknown>,
  TUpdate = Partial<T>,
>(service: CrudService<T, TCreate, TUpdate>, options: CrudHookOptions) {
  return function useAdminCrud() {
    const queryClient = useQueryClient();

    const listQuery = useQuery({
      queryKey: options.queryKey,
      queryFn: service.list,
    });

    const createMutation = useMutation({
      mutationFn: service.create,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: options.queryKey });
        toast.success(`${options.resourceName} created`);
      },
      onError: (error: Error) => {
        toast.error(error.message || `Failed to create ${options.resourceName}`);
      },
    });

    const updateMutation = useMutation({
      mutationFn: ({ id, data }: { id: string; data: TUpdate }) =>
        service.update(id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: options.queryKey });
        toast.success(`${options.resourceName} updated`);
      },
      onError: (error: Error) => {
        toast.error(error.message || `Failed to update ${options.resourceName}`);
      },
    });

    const deleteMutation = useMutation({
      mutationFn: service.remove,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: options.queryKey });
        toast.success(`${options.resourceName} deleted`);
      },
      onError: (error: Error) => {
        toast.error(error.message || `Failed to delete ${options.resourceName}`);
      },
    });

    return {
      items: listQuery.data ?? [],
      isLoading: listQuery.isLoading,
      isFetching: listQuery.isFetching,
      refetch: listQuery.refetch,
      create: createMutation.mutateAsync,
      update: (id: string, data: TUpdate) =>
        updateMutation.mutateAsync({ id, data }),
      remove: deleteMutation.mutateAsync,
      isCreating: createMutation.isPending,
      isUpdating: updateMutation.isPending,
      isDeleting: deleteMutation.isPending,
    };
  };
}
