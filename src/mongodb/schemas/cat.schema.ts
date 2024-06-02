// Nest dependencies
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Other dependencies
import { HydratedDocument } from 'mongoose';

// Local dependencies
import { AffiliateDocument, AffiliateSchema } from './affiliate.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
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
