interface BaseResponsePattern<T> {
  success: boolean;
  error?: string;
  message?: string;
  payload: T;
}
export type Response<T> = BaseResponsePattern<T>;
