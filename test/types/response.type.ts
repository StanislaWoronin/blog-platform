interface IResponse<T> {
  body: T;
  status: number;
}

export type ResponseType<T> = IResponse<T>;
