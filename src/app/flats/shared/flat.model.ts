import { House } from '../../houses/shared/house.model';
import { Resident } from '../../residents/shared/resident.model';
export class Flat {
  id: number;
  floor: number;
  number: number;
  totalarea: number;
  livingspace: number;
  houseid: number;
  house: House;
  residents: Resident[];
}
