import { Component, OnInit } from '@angular/core';
import { HouseService } from '../shared/house.service';
import { House } from '../shared/house.model';
import { ToastrService } from 'ngx-toastr';
import { FlatService } from '../../flats/shared/flat.service';
import { LoginService } from '../../shared/login.service';
@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  isAdmin: boolean;

  constructor(private houseService: HouseService, private toastr: ToastrService, private loginService: LoginService) {
    if (this.loginService.checkIfAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
   }
  /**
   * fucntion that will ensure that when our project will be initialized
   * the fucntions that are in it will be immediately called
   * in our case it will call getHouseList(to get House list)
   * @memberof ResidentListComponent
   */
  ngOnInit() {
    this.houseService.getHouseList();
  }
  showForedit(hos: House) {
    // nuzno dlja togo wtobi izmenenija v objekte sohranjalisj ne srazu
    this.houseService.selectedHouse = Object.assign({}, hos);
  }
  showInfoAboutHouse(id: number) {
    this.houseService.SourtedFlats = [];
    this.houseService.getFlatListAsAdditionalInformationAboutHouse(id);
  }
  showInfoAboutFlat(id: number) {
    this.houseService.SourtedResidents = [];
    this.houseService.getResidentListAsAdditionalInformationAboutFlat(id);
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.houseService.deleteHouse(id)
        .subscribe(x => {
          this.houseService.getHouseList();
          this.toastr.warning('Deleted :)', 'House Register');
        });
    }
  }
}
