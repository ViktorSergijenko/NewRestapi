import { Injectable } from '@angular/core';
import {House} from './house.model';
@Injectable()
export class HouseService {
  selectedHouse: House;
  constructor() { }

}
