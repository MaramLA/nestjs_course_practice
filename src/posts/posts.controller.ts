import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log('postQuery', postQuery);
    return this.postsService.findAll(postQuery, userId);
  }

  @ApiOperation({ summary: 'create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'you get 201 if request was succssful',
  })
  @Post()
  public createPost(@Req() request /*@Body() createdPost: CreatePostDto*/) {
    // return this.postsService.createPost(createdPost);
    console.log('request.user: ', request[REQUEST_USER_KEY]);
  }

  @Patch()
  @ApiOperation({ summary: 'update an existing post' })
  public async updatewPost(@Body() patchPostDto: PatchPostDto) {
    // console.log(patchPostsDto);
    return await this.postsService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
