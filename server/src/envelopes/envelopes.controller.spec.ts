import { Test, TestingModule } from '@nestjs/testing';
import { EnvelopesController } from './envelopes.controller';
import { EnvelopesService } from './envelopes.service';

describe('EnvelopesController', () => {
  let controller: EnvelopesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvelopesController],
      providers: [EnvelopesService],
    }).compile();

    controller = module.get<EnvelopesController>(EnvelopesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
