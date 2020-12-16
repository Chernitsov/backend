import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { PostDto } from './dto/post.dto';
import { PostEntity } from './post.entity';
import { plainToClass } from 'class-transformer';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  private logger = new Logger('PostRepository');

  async getPosts(
    filterDto: GetPostsFilterDto,
    user: UserEntity,
  ): Promise<PostDto[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('post');

    // query.where('post.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere(
        '(post.title LIKE :search OR post.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const posts = await query
        .leftJoinAndSelect('post.user', 'user')
        .getMany();
      return plainToClass(PostDto, posts);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostDto> {
    const { title, description } = createPostDto;

    const post = new PostEntity();
    post.title = title;
    post.description = description;
    post.user = user;

    try {
      const result = await this.save(post);
      return plainToClass(PostDto, result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
