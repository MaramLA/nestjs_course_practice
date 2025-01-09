import { CreatePostMetaOptionDto } from './dtos/create-posts-metaOption.dto';
import { MetaOptionsService } from './providers/meta-options.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionService: MetaOptionsService) {}

  @Post()
  public createMetaOptopn(@Body() newMetaOption: CreatePostMetaOptionDto) {
    return this.metaOptionService.create(newMetaOption);
  }
}
