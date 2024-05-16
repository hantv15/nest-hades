import { Injectable } from '@nestjs/common';
import { FilterJapanCites } from './dtos/filter-japan-cities.dto';
import * as fs from 'fs';

@Injectable()
export class JapanService {
  private readonly japanCities = "src/common/jsons/cites-japan.json";

  private paginate(array, page_size, page_number) {
    --page_number; // Điều chỉnh trang bắt đầu từ 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  private filterBySearch(search: string, cities: any[]) {
    return cities.filter(item => {
      return item.name.toLowerCase().includes(`/${search.toLowerCase()}/g`);
    })
  }

  getJapanCity(dto: FilterJapanCites) {
    const pageSize: number = dto?.page || 1000;
    const pageNumber: number = dto?.page || 1;
    const json = fs.readFileSync(this.japanCities, "utf8");
    let parseJson = JSON.parse(json);

    if (dto?.search) {
      parseJson = this.filterBySearch(dto.search, parseJson);
    }
    const currentPageData = this.paginate(parseJson, pageSize, pageNumber);
    
    return currentPageData
  }
}
