import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from 'supertest/types';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import * as request from 'supertest';
import { completeUser } from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    // instaniate nest.js app
    app = await bootstrapNestApplication();

    // extract the config
    config = app.get<ConfigService>(ConfigService);

    // extract the http server
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    console.log(completeUser);
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it.todo('/users - firstName is required');
  it.todo('/users - email is required');
  it.todo('/users - password is required');
  it.todo('/users - Valid request successfully creates user');
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');
});
