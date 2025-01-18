import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { User } from '../user.entity';
import { CreateUserDto } from './../dtos/create-user.dto';
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

    // inject datasource
    private readonly dataSource: DataSource,
  ) {}

  public async createUser(newUser: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.userRepository.findOne({
        where: { email: newUser.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'User already exists please check your email',
      );
    }

    let createdUser = this.userRepository.create(newUser);

    try {
      createdUser = await this.userRepository.save(createdUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }
  }
  /**
   * Find all users and fetch them
   */
  public findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    // custom exception handler
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'The API endpoint was moved permenantly',
      },
    );
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

  public async createMany(createUsersDto: CreateUserDto[]) {
    let newUsers: User[] = [];
    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect query runner to the datasource
    await queryRunner.connect();
    // start transaction
    await queryRunner.startTransaction();
    try {
      for (user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successful tansaaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccessful transaction
      await queryRunner.rollbackTransaction();
    } finally {
      // release connection
      await queryRunner.release();
    }
  }
}
