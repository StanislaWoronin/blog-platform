import {
  IsEmail,
  IsString,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  //@Validate(LoginExistValidator)
  @Length(3, 10)
  login: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @Length(6, 20)
  password: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim())
  //@Validate(EmailExistValidator)
  @MinLength(3)
  email: string;
}
