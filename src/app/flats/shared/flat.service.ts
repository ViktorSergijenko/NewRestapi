import { Injectable } from '@angular/core';
import {Flat} from './flat.model';

@Injectable()
export class FlatService {
  selectedFlat : Flat;
  constructor() { }

}
