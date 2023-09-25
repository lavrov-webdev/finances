import { Module } from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { EnvelopesController } from './envelopes.controller';

@Module({
  controllers: [EnvelopesController],
  providers: [EnvelopesService],
  exports: [EnvelopesService],
})
export class EnvelopesModule {}
