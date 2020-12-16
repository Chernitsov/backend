import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsDefined,
} from 'class-validator';

export class RegisterCredentialsDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @ApiProperty()
  @IsPhoneNumber('ZZ')
  @IsOptional()
  phone: string;
}
