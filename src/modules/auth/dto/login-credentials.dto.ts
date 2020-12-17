import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';

export class LoginCredentialsDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly password: string;
}
