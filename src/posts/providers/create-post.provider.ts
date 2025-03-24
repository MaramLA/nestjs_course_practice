import { ActiveUserData } from './../../auth/interfaces/active-user-data.interface';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class CreatePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly tagsService: TagsService,
    private readonly userService: UserService,
  ) {}
  public async createPost(user: ActiveUserData, newPost: CreatePostDto) {
    let author = undefined;
    let tags = undefined;
    try {
      tags = await this.tagsService.findMultipleTags(newPost.tags);
      author = await this.userService.findOneById(user.sub);
    } catch (error) {
      throw new ConflictException(error);
    }
    if (newPost.tags.length !== tags.length) {
      throw new BadRequestException('Tags not found');
    }
    const createdPost = this.postRepository.create({
      ...newPost,
      author: author,
      tags: tags,
    });

    try {
      return await this.postRepository.save(createdPost);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not duplicated',
      });
    }
  }
}
