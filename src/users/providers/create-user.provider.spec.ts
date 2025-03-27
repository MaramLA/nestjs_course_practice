import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

// Defining a mock repository type
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// Creating a mock repository which sets three mock methods
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CreateUserProvider', () => {
  // can contain 4 methods: beforeEach, beforeAll, afterAll, afterEach

  let provider: CreateUserProvider;
  let usersRepository: MockRepository;

  // will run before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: HashingProvider,
          useValue: {},
        },
        {
          provide: MailService,
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<CreateUserProvider>(CreateUserProvider);

    // re-assigning the repositry varaible and extracting it to test it
    usersRepository = module.get(getRepositoryToken(User));
  });

  // it method specefies what is being tested
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
