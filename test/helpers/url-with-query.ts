import { TestsPaginationType } from "../types/pagination.type";

export const getUrlWithQuery = <T>(
  endpoint: string,
  query: TestsPaginationType<T>,
): string => {
  let url = `${endpoint}?`;

  for (const key in query) {
    if (Array.isArray(query[key])) {
      for (const val of query[key]) {
        url += `${key}=${val}&`;
      }
    } else {
      url += `${key}=${query[key]}&`;
    }
  }

  return url.slice(0, -1);
};
