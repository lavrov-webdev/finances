import { Test, TestingModule } from '@nestjs/testing';
import { EnvelopesService } from './envelopes.service';

describe('EnvelopesService', () => {
  let service: EnvelopesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvelopesService],
    }).compile();

    service = module.get<EnvelopesService>(EnvelopesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
