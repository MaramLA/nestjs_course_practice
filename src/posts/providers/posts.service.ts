import { TagsService } from './../../tags/providers/tags.service';
import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/metaOption.entity';
import { UserService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { Post } from '../post.entity';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async createPost(@Body() newPost: CreatePostDto) {
    const tags = await this.tagsService.findMultipleTags(newPost.tags);
    const foundUser = await this.userService.findOneById(newPost.authorId);
    const createdPost = this.postRepository.create({
      ...newPost,
      author: foundUser,
      tags: tags,
    });
    return await this.postRepository.save(createdPost);
  }

  public async findAll(userId: string) {
    const posts = this.postRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        tags: true,
      },
    });
    return posts;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags, post;
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
      post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }

    if (!post) {
      throw new BadRequestException(
        `Post with id ${patchPostDto.id} not found`,
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('Please ensure tag ids are cosrect');
    }

    patchPostDto.title = patchPostDto.title ?? post.title;
    patchPostDto.postType = patchPostDto.postType ?? post.postType;
    // patchPostDto.slug = patchPostDto.slug ?? post.slug;
    patchPostDto.status = patchPostDto.status ?? post.status;
    patchPostDto.content = patchPostDto.content ?? post.content;
    patchPostDto.schema = patchPostDto.schema ?? post.schema;
    patchPostDto.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    patchPostDto.publishOn = patchPostDto.publishOn ?? post.publishOn;

    post.tags = tags;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }
    return post;
  }
}
