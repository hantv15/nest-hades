// Nest dependencies
import { Body, Controller, Get, Post } from '@nestjs/common';

// Local dependencies
import { CategorySchema } from 'src/mongodb/schemas/category.schema';
import { CatService } from './cat.service';
import { CreateCatDto } from './dtos/create-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Post('create')
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    return CategorySchema;
  }
}
