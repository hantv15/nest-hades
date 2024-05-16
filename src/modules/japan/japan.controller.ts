import { Controller, Get } from '@nestjs/common';
import { FilterJapanCites } from './dtos/filter-japan-cities.dto';
import { JapanService } from './japan.service';

@Controller('japan')
export class JaapnController {
  constructor(private readonly japanService: JapanService) {}

  @Get()
  getJapanCities(dto: FilterJapanCites) {
    return this.japanService.getJapanCity(dto);
  }
}
