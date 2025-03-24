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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostDto } from './dtos/create-posts.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostsService } from './providers/posts.service';

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
  public createPost(
    @Body() createdPost: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.createPost(user, createdPost);
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
