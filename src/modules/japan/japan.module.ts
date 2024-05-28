import { Module } from '@nestjs/common';
import { JaapnController } from './japan.controller';
import { JapanService } from './japan.service';

@Module({
  controllers: [JaapnController],
  providers: [JapanService]
})
export class JapanModule {}
