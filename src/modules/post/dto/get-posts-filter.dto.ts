import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetPostsFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
