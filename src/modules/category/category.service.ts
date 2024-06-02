import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/mongodb/schemas/category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    return await this.categoryModel.find().populate('parents').exec();
  }

  async update(id: string, dto: UpdateCategoryDto) {
    let updateCategory = undefined;
    const foundCategory = await this.categoryModel.findById(id);

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    const foundCategoryName = await this.categoryModel.findOne({
      name: dto.name,
      _id: { $ne: id },
    });

    if (foundCategoryName) {
      throw new ConflictException('Category name found');
    }

    if (dto?.category_id) {
      const parentCategory = await this.categoryModel.findById(dto.category_id);

      if (!parentCategory) {
        throw new NotFoundException();
      }
    }

    const session = await this.categoryModel.db.startSession();
    session.startTransaction();
    try {
      if (dto?.category_id) {
        dto['parents'] = [...foundCategory.parents, dto.category_id];
      }
      this.categoryModel.findOneAndUpdate(
        { _id: id },
        { parents: [...foundCategory.parents, dto.category_id] },
        {
          new: true,
          session,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    } finally {
      await session.commitTransaction();
      session.endSession();
    }

    const data = await this.categoryModel.find().populate('parents').exec();

    return data;
  }

  async create(dto: CreateCategoryDto) {
    let createdCategory = undefined;
    const foundCategory = await this.categoryModel.findOne({ name: dto.name });

    if (foundCategory) {
      throw new ConflictException('Category found');
    }

    if (dto?.category_id) {
      const parentCategory = await this.categoryModel.findById(dto.category_id);

      if (!parentCategory) {
        throw new NotFoundException();
      }
    }

    const session = await this.categoryModel.db.startSession();
    session.startTransaction();
    try {
      if (dto?.category_id) {
        dto['parents'] = [dto.category_id];
      }
      const category = new this.categoryModel(dto);
      createdCategory = await category.save({ session });
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await session.commitTransaction();
      session.endSession();
    }

    const data = await this.categoryModel.find().populate('parents').exec();

    return data;
  }

  check(a: any) {
    if (typeof a === 'string') {
      throw new BadRequestException();
    }
  }
}
