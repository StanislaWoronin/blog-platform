import { QueryDto } from '../../../../../../../libs/shared/pagination/query-parameters/query.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  BanStatus,
  SortDirection,
} from '../../../../../../../libs/shared/enum';
import { SortByUserField } from './sort-by-user.field';

export class UserQueryDto extends QueryDto {
  @IsEnum(BanStatus)
  @IsOptional()
  banStatus: BanStatus = BanStatus.All;

  @IsString()
  @IsOptional()
  searchLoginTerm: string | null;

  @IsString()
  @IsOptional()
  searchEmailTerm: string | null;

  @IsEnum(SortByUserField)
  @IsOptional()
  sortBy: SortByUserField = SortByUserField.CreatedAt;

  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection: SortDirection = SortDirection.Descending;
}
