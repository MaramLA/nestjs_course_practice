import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { User } from '../user.entity';
import { CreateUserDto } from './../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
/**
 * Class to connect users and performe business operations
 */
@Injectable()
export class UserService {
  /**
   * Constructor
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    // private readonly configService: ConfigService,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // inject UsersCreateManyProvider
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly paginationProvider: PaginationProvider,

    private readonly createUserProvier: CreateUserProvider,

    private readonly findUserByEmailProvider: FindUserByEmailProvider,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvier.createUser(createUserDto);
  }
  /**
   * Find all users and fetch them
   */
  public async findAll(
    getUserParamsDto: GetUserParamsDto,
    paginationQuery: PaginationQueryDto,
  ) {
    try {
      console.log('paginationQuery.limit= ', paginationQuery.limit);
      console.log('paginationQuery.page= ', paginationQuery.page);

      const users = await this.paginationProvider.paginateQuery(
        {
          limit: paginationQuery.limit,
          page: paginationQuery.page,
        },
        this.userRepository,
      );

      console.log('users= ', users);

      if (!users) {
        throw new BadRequestException('No users found');
      }

      return users;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }

    // // custom exception handler
    // throw new HttpException(
    //   {
    //     status: HttpStatus.MOVED_PERMANENTLY,
    //     error: 'The API endpoint does not exist',
    //     fileName: 'users.service.ts',
    //     lineNumber: 88,
    //   },
    //   HttpStatus.MOVED_PERMANENTLY,
    //   {
    //     cause: new Error(),
    //     description: 'The API endpoint was moved permenantly',
    //   },
    // );
  }

  /**
   * Fetch a user by ID
   */
  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }

    if (!user) {
      throw new BadRequestException('User id does not exist');
    }
    return user;
  }

  public async findOneByEmail(email: string) {
    return this.findUserByEmailProvider.findUserByEmail(email);
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
