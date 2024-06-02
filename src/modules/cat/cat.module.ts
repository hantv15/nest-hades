// Nest dependencies
import { Module } from '@nestjs/common';

// Local dependencies
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [MongodbModule],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
