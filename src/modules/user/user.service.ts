// Nest dependencies
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Other dependencies
import { Model } from 'mongoose';

// Local dependencies
import { getKey } from 'src/common/helpers/randomkeygen.helper';
import { User } from 'src/mongodb/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateRefrallCodeDto } from './dtos/update-referall-code.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateReferralCode(
    id: string,
    updateRefrallCodeDto: UpdateRefrallCodeDto,
  ) {
    let foundReferralCode: User = undefined;
    let userUpdateReferralCode: User = undefined;

    userUpdateReferralCode = await this.userModel.findById(id);

    if (!userUpdateReferralCode) {
      throw new NotFoundException('User update referral code not found');
    }

    foundReferralCode = await this.userModel.findOne({
      referral_code: updateRefrallCodeDto.referral_code,
    });

    if (!foundReferralCode) {
      throw new NotFoundException('Referral Code not found');
    }

    if (foundReferralCode.referred_by) {
      throw new ConflictException('User was referral code');
    }

    if (
      userUpdateReferralCode.referral_code === foundReferralCode.referral_code
    ) {
      throw new ConflictException('Referral Code invalid');
    }

    const parent_tree = [
      ...foundReferralCode.parent_tree,
      foundReferralCode['id'],
    ];

    const session = await this.userModel.db.startSession();
    session.startTransaction();

    try {
      userUpdateReferralCode = await this.userModel
        .findOneAndUpdate(
          { _id: id },
          {
            referred_by: updateRefrallCodeDto.referral_code,
            parent_tree: parent_tree,
          },
          {
            new: true,
            session,
          },
        )
        .populate('parent_tree')
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    } finally {
      await session.commitTransaction();
      session.endSession();
    }

    return userUpdateReferralCode;
  }

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
