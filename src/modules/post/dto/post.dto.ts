import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserEntity } from 'src/modules/user/user.entity';
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
  @Expose()
  userId: number;

  @ApiProperty()
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
