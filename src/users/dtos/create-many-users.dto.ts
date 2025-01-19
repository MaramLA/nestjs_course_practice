import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  users: CreateUserDto[];
}
