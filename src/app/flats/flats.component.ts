import { Component, OnInit } from '@angular/core';
import { FlatService } from './shared/flat.service';
import { LoginService } from '../shared/login.service';
@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css'],
  providers: [FlatService]
})
export class FlatsComponent implements OnInit {
  isAdmin: boolean;

  constructor(private flatService: FlatService, private loginService: LoginService) {
    if (this.loginService.checkIfAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
   }

  ngOnInit() {
  }

}
