import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
  //   @Get('/:id')
  //   public getUsers(@Param() params: any, @Query() query: any) {
  //     console.log('params: ', params);
  //     console.log('query: ', query);
  //     return 'get all users request';
  //   }

  //   grab specific attribute in params or query
  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'limit of the payload',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'page number',
    example: 1,
  })
  public getUser(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.usersService.findAll(getUserParamsDto, paginationQuery);
  }

  @Post()
  // @SetMetadata('authtype', 'None')
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }

  @Patch()
  public patchUser(@Body() body: PatchUserDto) {
    return body;
  }

  //   another approach to grap the express request
  //   @Post()
  //   public createUsers(@Req() request: Request) {
  //     console.log('request: ', request);
  //     return 'create user request';
  //   }
}
