// Nest dependencies
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Other dependencies
import { HydratedDocument } from 'mongoose';
import {
  ComissionRateDocument,
  ComissionRateSchema,
} from './comission-rate.schema';

export type AffiliateDocument = HydratedDocument<Affiliate>;

@Schema()
export class Affiliate {
  @Prop({ type: ComissionRateSchema })
  affiliate: ComissionRateDocument;

  @Prop({ type: ComissionRateSchema })
  refferral: ComissionRateDocument;
}

export const AffiliateSchema = SchemaFactory.createForClass(Affiliate);
