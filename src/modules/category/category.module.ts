// Nest dependencies
import { Module } from '@nestjs/common';

// Local dependencies
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [MongodbModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
