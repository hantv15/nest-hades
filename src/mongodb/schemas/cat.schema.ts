// Nest dependencies
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Other dependencies
import { HydratedDocument } from 'mongoose';
import { AffiliateDocument, AffiliateSchema } from './affiliate.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: AffiliateSchema })
  affiliate: AffiliateDocument;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
