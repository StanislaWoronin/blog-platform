import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetUsersQueryHandler } from './get-users/get-users.query-handler';

// Queries
export * from './get-users/get-users.query';

// Query handlers
export * from './get-users/get-users.query-handler';

export const USER_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetUsersQueryHandler,
];
