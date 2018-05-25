import { Component, OnInit } from '@angular/core';
import {ResidentService} from '../shared/resident.service';
import {Resident} from '../shared/resident.model';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.css']
})
export class ResidentListComponent implements OnInit {

  constructor(private residentService : ResidentService,private toastr: ToastrService) { }

  ngOnInit() {
    this.residentService.getResidentList();
    this.residentService.getFlatListToDropDown();
    
  }
  ShowInfo2(flatid: number){
    this.residentService.getFlatList(flatid);
  }
  showForedit(resi: Resident) {
      
    // nuzno dlja togo wtobi izmenenija v objekte sohranjalisj ne srazu
    this.residentService.selectedResident = Object.assign({}, resi);
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
    this.residentService.deleteResident(id)
    .subscribe(x => {
      this.residentService.getResidentList();
      this.toastr.warning('Deleted :)', 'House Register');
    })
    }
   }
}