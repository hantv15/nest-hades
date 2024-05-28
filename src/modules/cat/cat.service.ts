import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dtos/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/mongodb/schemas/cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto) {
    const affiliate = {
      affiliate: {
        percent: 10,
        price: 100000,
      },
      refferral: {
        percent: 5,
        price: 50000,
      },
    };
    createCatDto['affiliate'] = affiliate;
    const createdCat = await this.catModel.create(createCatDto);

    return createdCat.save();
  }
}
