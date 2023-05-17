import {
  BanStatus,
  PublishedStatus,
  SortDirection,
} from '../../libs/shared/enum';

export type TestsPaginationType<T> = Partial<{
  searchLoginTerm: string;
  searchEmailTerm: string;
  bodySearchTerm: string;
  sortBy: T;
  sort: T[] | string[];
  sortDirection: SortDirection;
  publishedStatus: PublishedStatus;
  banStatus: BanStatus;
  pageNumber: number;
  pageSize: number;
}>;
