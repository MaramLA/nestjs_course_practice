import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';

// User created modules

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema: environmentValidation,
    }),

    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
      ],
      inject: [ConfigService],
      // use database environment variables
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.name'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
