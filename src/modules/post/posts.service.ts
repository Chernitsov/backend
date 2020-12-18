import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { PostDto } from './dto/post.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PostsService {
  private logger = new Logger('PostService');

  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository,
  ) {}

  async getPosts(filterDto: GetPostsFilterDto): Promise<PostDto[]> {
    return this.postRepository.getPosts(filterDto);
  }

  async getPostById(id: number): Promise<PostDto> {
    const query = this.postRepository.createQueryBuilder('post');

    query.addSelect('user.username');
    query.addSelect('user.id');
    query.addSelect('user.firstName');
    query.addSelect('user.lastName');
    query.andWhere('(post.id = :id)', {
      id: id,
    });
    query.leftJoin('post.user', 'user');

    try {
      const found = await query.getOne();

      if (!found) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }

      return plainToClass(PostDto, found);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostDto> {
    return this.postRepository.createPost(createPostDto, user);
  }

  async deletePost(id: number, user: UserEntity): Promise<any> {
    // TODO: CHECK IF POST IS FROM USER

    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return Promise.resolve({
      result: result,
      status: 'success',
    });
  }

  async updatePost(
    id: number,
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostDto> {
    // TODO: CHECK IF POST IS FROM USER

    const post = await this.getPostById(id);

    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.text = createPostDto.text;

    await this.postRepository.save(post);
    return post;
  }
}
