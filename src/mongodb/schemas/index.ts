// Local dependencies
import { Cat, CatSchema } from './cat.schema';
import { User, UserSchema } from './user.schema';

export const schemas = [
  { name: Cat.name, schema: CatSchema },
  { name: User.name, schema: UserSchema },
];
