import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { User } from '../user.entity';

// steps for using a query runner
//     inject the datasource object to manage database connections
//     create a new query runner instance using the datasource object
//     connect the query runner to the database
//     start transaction using the query runner
//     user query runner manager to manage different operations
//     commit transaction
//     if error occured roll back transaction and throw an error
//     release connection

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // inject datasource
    private readonly dataSource: DataSource,
  ) {}
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    let queryRunner;
    try {
      // create query runner instance
      queryRunner = this.dataSource.createQueryRunner();
      // connect query runner to the datasource
      await queryRunner.connect();
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('could not connect to the database');
    }
    // start transaction
    await queryRunner.startTransaction();
    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successful tansaaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccessful transaction
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // release connection
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('could not release the connection', {
          description: String(error),
        });
      }
    }
    return newUsers;
  }
}
