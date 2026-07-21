export interface ApiErrorBody {
  message?: string;
}

export type ApiResponse<T> = {
  data: T;
};
