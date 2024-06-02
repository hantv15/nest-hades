// Local dependencies
import { Cat, CatSchema } from './cat.schema';
import { Category, CategorySchema } from './category.schema';
import { User, UserSchema } from './user.schema';

export const schemas = [
  { name: Cat.name, schema: CatSchema },
  { name: User.name, schema: UserSchema },
  { name: Category.name, schema: CategorySchema },
];
