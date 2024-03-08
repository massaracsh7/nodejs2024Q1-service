import { Global, Module } from '@nestjs/common';
import { Data } from './data.service';

@Global()
@Module({
  providers: [Data],
  exports: [Data],
})
export class DataModule {}
