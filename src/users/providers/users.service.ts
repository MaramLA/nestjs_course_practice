import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
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
  ) {}

  public async createUser(newUser: CreateUserDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: newUser.email },
    });

    let createdUser = this.userRepository.create(newUser);
    createdUser = await this.userRepository.save(createdUser);

    return createdUser;
  }
  /**
   * Find all users and fetch them
   */
  public findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    // const environment = this.configService.get('INFO');
    // console.log(environment);
    console.log('this.profileConfiguration: ', this.profileConfiguration);

    const isAuth = this.authService.isAuth();
    console.log('isAuth: ', isAuth);
    return [
      {
        firstName: 'John',
        email: 'john@gmail.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@gmail.com',
      },
    ];
  }

  /**
   * Fetch a user by ID
   */
  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
