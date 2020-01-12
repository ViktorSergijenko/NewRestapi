import { Component, OnInit } from '@angular/core';
import { ResidentService } from './shared/resident.service';
import { LoginService } from '../shared/login.service';
@Component({
  providers: [ResidentService],
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {
  isAdmin: boolean;

  constructor(private residentService: ResidentService, private loginService: LoginService) {
    if (this.loginService.checkIfAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
   }

  ngOnInit() {
  }

}
