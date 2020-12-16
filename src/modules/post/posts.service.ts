import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { PostDto } from './dto/post.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository,
  ) {}

  async getPosts(
    filterDto: GetPostsFilterDto,
    user: UserEntity,
  ): Promise<PostDto[]> {
    return this.postRepository.getPosts(filterDto, user);
  }

  async getPostById(id: number, user: UserEntity): Promise<PostDto> {
    const found = await this.postRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!found) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return plainToClass(PostDto, found);
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostDto> {
    return this.postRepository.createPost(createPostDto, user);
  }

  async deletePost(id: number, user: UserEntity): Promise<any> {
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
    const post = await this.getPostById(id, user);
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.text = createPostDto.text;

    await this.postRepository.save(post);
    return post;
  }
}
