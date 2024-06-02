// Nest dependencies
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Other dependencies
import mongoose, { HydratedDocument, Mongoose, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Category {
  @Prop({
    unique: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Category',
  })
  parents: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
