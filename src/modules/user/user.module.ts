import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { schemas } from 'src/mongodb/schemas';

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule.forFeature(schemas)],
})
export class UserModule {}
