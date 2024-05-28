import { Body, Controller, Post } from '@nestjs/common';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Post("create")
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }
}
