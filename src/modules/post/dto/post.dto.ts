import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { AbstractDto } from '../../../commun/dto/abstract.dto';
import { UserDto } from '../../user/dto/user.dto';

@Exclude()
export class PostDto extends AbstractDto {
  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  text: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
