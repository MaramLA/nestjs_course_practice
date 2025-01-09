import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class getPostsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;
}
