import { Component, OnInit } from '@angular/core';
import {HouseService} from './shared/house.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
  providers: [HouseService]
})
export class HousesComponent implements OnInit {

  constructor(private houseService: HouseService) { }

  ngOnInit() {
  }

}
