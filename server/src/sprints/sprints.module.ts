import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { EnvelopesModule } from 'src/envelopes/envelopes.module';

@Module({
  imports: [EnvelopesModule],
  controllers: [SprintsController],
  providers: [SprintsService],
})
export class SprintsModule {}
