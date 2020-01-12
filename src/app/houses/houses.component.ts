import { Component, OnInit } from '@angular/core';
import {HouseService} from './shared/house.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
  providers: [HouseService]
})
export class HousesComponent implements OnInit {
  isAdmin: boolean;

  constructor(private houseService: HouseService, private loginService: LoginService) { 
    if (this.loginService.checkIfAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  ngOnInit() {
  }

}
