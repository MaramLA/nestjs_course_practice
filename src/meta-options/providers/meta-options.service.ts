import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from '../metaOption.entity';
import { CreatePostMetaOptionDto } from 'src/meta-options/dtos/create-posts-metaOption.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(newMetaOption: CreatePostMetaOptionDto) {
    let createdMetaOption = this.metaOptionRepository.create(newMetaOption);
    createdMetaOption = await this.metaOptionRepository.save(createdMetaOption);
    return createdMetaOption;
  }
}
