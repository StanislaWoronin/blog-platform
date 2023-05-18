import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { giveSkipNumber } from './helpers';

export class QueryDto {
  constructor() {
    Object.defineProperty(this, 'skip', {
      get() {
        return giveSkipNumber(this.pageNumber, this.pageSize);
      },
      set(_val: string) {
        throw Error(`Property "skip" are only getter. Don't set value ${_val}`);
      },
    });
  }

  @ApiProperty({ default: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageNumber = 1;

  @ApiProperty({ default: 10, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize = 10;

  /**
   * Property "skip" are only getter. Don\'t set value
   */
  skip = 0;
}
