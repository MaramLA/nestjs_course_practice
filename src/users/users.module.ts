import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import profileConfig from './config/profile.config';
import { UserService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreateManyProvider],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UsersModule {}
