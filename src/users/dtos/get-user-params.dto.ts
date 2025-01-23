import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetUserParamsDto {
  @ApiPropertyOptional({ description: 'Get a user by ID', example: 1234 })
  @IsOptional()
  // @IsInt()
  id?: number;
}
