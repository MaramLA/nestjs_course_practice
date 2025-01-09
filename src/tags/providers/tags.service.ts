import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { createTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(newTag: createTagDto) {
    const createdTag = await this.tagRepository.create(newTag);
    return await this.tagRepository.save(createdTag);
  }
  public async findMultipleTags(tags: number[]) {
    const foundTags = await this.tagRepository.find({
      where: { id: In(tags) },
    });
    return foundTags;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return { deleted: true, id };
  }

  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return { deleted: true, id };
  }
}
