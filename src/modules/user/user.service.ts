// Nest dependencies
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Other dependencies
import { Model } from 'mongoose';

// Local dependencies
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from 'src/mongodb/schemas/user.schema';
import { getKey } from 'src/common/helpers/randomkeygen.helper';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    let createdUser = undefined;

    const foundUserEmail = await this.userModel.findOne({ email: email });

    if (foundUserEmail) {
      throw new ConflictException('Email found');
    }

    try {
      const referralCode = getKey('64_wep');
      createUserDto['referral_code'] = referralCode;

      createdUser = await this.userModel.create(createUserDto);
      createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return createdUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
