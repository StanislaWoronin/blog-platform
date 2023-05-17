import { PageDto } from './page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { givePagesCount } from "./query-parameters";

export class ViewPage<I> {
  @ApiProperty()
  readonly page: number;
  @ApiProperty()
  readonly pageSize: number;
  @ApiProperty()
  readonly totalCount: number;
  @ApiProperty()
  readonly pagesCount: number;
  @ApiProperty()
  readonly items: I[];

  constructor({ items, query, totalCount }: PageDto<I>) {
    this.page = query.pageNumber;
    this.pageSize = query.pageSize;
    this.totalCount = totalCount;
    this.pagesCount = givePagesCount(this.totalCount, this.pageSize);
    this.items = items;
  }
}
