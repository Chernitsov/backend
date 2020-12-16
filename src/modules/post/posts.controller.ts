import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { UserEntity } from '../user/user.entity';
import { AuthUser } from 'src/commun/decorators';
import { PostDto } from './dto/post.dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  private logger = new Logger('PostsController');

  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
    @AuthUser() user: UserEntity,
  ): Promise<PostDto[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all posts. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.postsService.getPosts(filterDto, user);
  }

  @Get('/:id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity,
  ): Promise<PostDto> {
    return this.postsService.getPostById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @AuthUser() user: UserEntity,
  ): Promise<PostDto> {
    this.logger.verbose(
      `User "${user.username}" creating a new post. Data: ${JSON.stringify(
        createPostDto,
      )}`,
    );
    return this.postsService.createPost(createPostDto, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity,
  ): Promise<any> {
    return this.postsService.deletePost(id, user);
  }

  @Patch('/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
    @AuthUser() user: UserEntity,
  ): Promise<PostDto> {
    return this.postsService.updatePost(id, createPostDto, user);
  }
}
