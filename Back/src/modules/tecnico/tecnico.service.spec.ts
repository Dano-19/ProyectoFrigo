import { Test, TestingModule } from '@nestjs/testing';
import { TecnicoService } from './tecnico.service';

describe('TecnicoService', () => {
  let service: TecnicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TecnicoService],
    }).compile();

    service = module.get<TecnicoService>(TecnicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
