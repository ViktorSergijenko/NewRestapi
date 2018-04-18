import { Component, OnInit } from '@angular/core';
import {HouseService} from '../shared/house.service';
import { House } from '../shared/house.model';
@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {

  constructor(private houseService: HouseService) { }

  ngOnInit() {
  }

}
