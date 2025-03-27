import { CreateUserDto } from './../dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { UserService } from './users.service';
import { AuthService } from 'src/auth/providers/auth.service';

describe('UsersService', () => {
  // can contain 4 methods: beforeEach, beforeAll, afterAll, afterEach

  let service: UserService;

  // will runbefore each test
  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CreateUserProvider,
          useValue: mockCreateUserProvider,
        },
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: CreateGoogleUserProvider,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },

        {
          provide: FindOneByGoogleIdProvider,
          useValue: {},
        },
        {
          provide: FindUserByEmailProvider,
          useValue: {},
        },
        {
          provide: PaginationProvider,
          useValue: {},
        },
        {
          provide: UsersCreateManyProvider,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // it method specefies what is being tested
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });

    it('should call createUser on CreateUserProvider', async () => {
      let user = await service.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'a@b.com',
        password: '12345',
      });
      expect(user.firstName).toEqual('John');
    });
  });
});
