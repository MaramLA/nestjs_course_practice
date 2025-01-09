import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserParamsDto {
  @ApiPropertyOptional({ description: 'Get a user by ID', example: 1234 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
