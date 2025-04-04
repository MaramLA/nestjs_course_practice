import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPostsBaseDto {
  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;
}

// to combine two dtos (pagination dto and get posts dto)
export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
