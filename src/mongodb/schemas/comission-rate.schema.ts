// Nest dependencies
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Other dependencies
import { HydratedDocument } from 'mongoose';

export type ComissionRateDocument = HydratedDocument<ComissionRate>;

@Schema()
export class ComissionRate {
  @Prop({ required: true })
  percent: number;

  @Prop({ required: true })
  price: number;
}
export const ComissionRateSchema = SchemaFactory.createForClass(ComissionRate);
