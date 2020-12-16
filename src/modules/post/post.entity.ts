import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../../commun/abstract.entity';

@Entity({ name: 'post' })
export class PostEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  text: string;

  @ManyToOne(
    type => UserEntity,
    user => user.posts,
    { eager: false },
  )
  user: UserEntity;

  @Column()
  userId: number;
}
