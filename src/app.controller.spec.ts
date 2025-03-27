import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  // can contain 4 methods: beforeEach, beforeAll, afterAll, afterEach

  let appController: AppController;

  // will runbefore each test
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile(); // compiles the module inside the object

    // extract the app controller form the app object
    appController = app.get<AppController>(AppController);
  });

  // nested describe method
  describe('root', () => {
    // it method specefies what is being tested
    it('Controller should be defined', () => {
      // testing an assertion
      expect(appController).toBeDefined();
    });
  });
});
