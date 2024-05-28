import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { schemas } from 'src/mongodb/schemas';

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
