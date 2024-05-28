// Nest dependencies
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Other dependencies
import mongoose, { HydratedDocument } from 'mongoose';

// Local dependencies
import { Cat } from './cat.schema';

export type UserDocument = HydratedDocument<Cat>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
  })
  last_name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: false,
  })
  phone_number: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  referral_code: string;

  @Prop({
    type: String,
    required: false,
  })
  referred_by: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
