import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../shared/resident.service';
import { Resident } from '../shared/resident.model';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../shared/login.service';
@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.css']
})
export class ResidentListComponent implements OnInit {
  isAdmin: boolean;

  constructor(private residentService: ResidentService, private toastr: ToastrService, private loginService: LoginService) {
    if (this.loginService.checkIfAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
   }
  /**
   * fucntion that will ensure that when our project will be initialized
   * the fucntions that are in it will be immediately called
   * in our case it will call getResidentList(to get resident list)
   * and getFlatListToDropDown(so our dropdown would have values that we need to register new resident)
   * @memberof ResidentListComponent
   */
  ngOnInit() {
    this.residentService.getResidentList();
    this.residentService.getFlatListToDropDown();
  }
  /**
   * Function that will show in what flat does
   * live our specific resident
   * @param {number} flatid flatid-value of Flat class that tell us in what flat does live our resident
   * @memberof ResidentListComponent ResidentListComponent-Component that have all needed fucntions to work with Resident page
   */
  ShowInfo2(flatid: number) {
    this.residentService.getFlatList(flatid);
  }
  /**
   * fucntion that rewiels all values of our object
   * to our Registration form(fucntion is used to change object values)
   * @param {Resident} resi resi-object that has Resident type
   * @memberof ResidentListComponent ResidentListComponent-Component that have all needed fucntions to work with Resident page
   */
  showForedit(resi: Resident) {
    // nuzno dlja togo wtobi izmenenija v objekte sohranjalisj ne srazu
    this.residentService.selectedResident = Object.assign({}, resi);
  }
  /**
   * fucntion that will delete a specific resident object that we will choose
   * First of all program will ask,do we really want to delete this object then
   * if object was sucessfully deleted,program will ensure about it.
   * @param {number} id id-id of an object that we want to delete
   * @memberof ResidentListComponent ResidentListComponent-Component that have all needed fucntions to work with Resident page
   */
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.residentService.deleteResident(id)
        .subscribe(x => {
          this.residentService.getResidentList();
          this.toastr.warning('Deleted :)', 'House Register');
        });
    }
  }
}
