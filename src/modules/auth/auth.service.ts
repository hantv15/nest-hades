// Nest dependencies
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Other dependencies
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { SiginDto } from './dtos/signin.dto';
import { User } from 'src/mongodb/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
  ) {}

  private async passwordHash(password: string) {
    const saltOrRounds = 10;
    const createdPasswordHash = await bcrypt.hash(password, saltOrRounds);

    return createdPasswordHash;
  }

  async signin(siginDto: SiginDto) {
    const { email, passowrd } = siginDto;
    const foundEmail = await this.userModel.findOne({ email });

    if (!foundEmail) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordMatch = await bcrypt.compare(passowrd, foundEmail.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const user = foundEmail.toObject();
    delete user.password;

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.passwordHash(createUserDto.password);
    
    return await this.userService.create(createUserDto);
  }
}
