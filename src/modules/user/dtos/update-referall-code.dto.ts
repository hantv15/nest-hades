import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRefrallCodeDto {
  @IsNotEmpty()
  @IsString()
  referral_code: string;
}
