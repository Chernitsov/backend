import { Exclude, Expose, Type } from 'class-transformer';
import { UserRole } from '../user-role.enum';
import { AbstractDto } from '../../../commun/dto/abstract.dto';
import { TaskDto } from '../../task/dto/task.dto';
import { PostDto } from 'src/modules/post/dto/post.dto';

@Exclude()
export class UserDto extends AbstractDto {
  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phone: string;

  password: string;

  salt: string;

  @Expose()
  @Type(() => TaskDto)
  tasks: TaskDto[];

  @Expose()
  @Type(() => PostDto)
  posts: PostDto[];

  @Expose()
  role: UserRole;
}
