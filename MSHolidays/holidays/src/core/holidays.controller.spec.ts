import { Test, TestingModule } from '@nestjs/testing';
import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './holidays.service';

describe('AppController', () => {
  let appController: HolidaysController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HolidaysController],
      providers: [HolidaysService],
    }).compile();

    appController = app.get<HolidaysController>(HolidaysController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
