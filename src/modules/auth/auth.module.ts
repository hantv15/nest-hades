// Nest dependencies
import { Module } from '@nestjs/common';

// Local dependencies
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MongodbModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
