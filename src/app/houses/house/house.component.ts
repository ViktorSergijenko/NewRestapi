import { Component, OnInit } from '@angular/core';
import {HouseService} from '../shared/house.service';
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(private houseService: HouseService) { }

  ngOnInit() {
  }

}
