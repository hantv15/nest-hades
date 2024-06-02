// Nest dependencies
import { Module } from '@nestjs/common';

// Local dependencies
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongodbModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
