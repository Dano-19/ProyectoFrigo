import { Test, TestingModule } from '@nestjs/testing';
import { TecnicoController } from './tecnico.controller';

describe('TecnicoController', () => {
  let controller: TecnicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnicoController],
    }).compile();

    controller = module.get<TecnicoController>(TecnicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
