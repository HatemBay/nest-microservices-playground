import { Test, TestingModule } from '@nestjs/testing';
import { SharedDtoService } from './shared-dto.service';

describe('SharedDtoService', () => {
  let service: SharedDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedDtoService],
    }).compile();

    service = module.get<SharedDtoService>(SharedDtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
