import { TagsService } from './providers/tags.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { createTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  public createTag(@Body() newTag: createTagDto) {
    return this.tagsService.create(newTag);
  }

  @Delete()
  public deleteTage(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  @Delete('soft-delete')
  public softDeleteTage(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
