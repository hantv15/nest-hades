// Nest dependencies
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Local dependencies
import { configService } from 'src/common/services/config.service';
import { schemas } from './schemas';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${configService.getEnv('MONGODB_USERNAME')}:${configService.getEnv('MONGODB_PASSWORD')}@cluster0.ujeaxsz.mongodb.net/${configService.getEnv('MONGODB_DATABASE')}?retryWrites=true&w=majority&appName=Cluster0`,
      {},
    ),
    MongooseModule.forFeature(schemas),
  ],
  exports: [MongooseModule.forFeature(schemas)],
})
export class MongodbModule {}
