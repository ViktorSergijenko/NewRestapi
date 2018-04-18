import { Component, OnInit } from '@angular/core';
import {HouseService} from '../shared/house.service';
import { House } from '../shared/house.model';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {

  constructor(private houseService: HouseService, private toastr: ToastrService)  { }

  ngOnInit() {
    this.houseService.getHouseList();
  }
    showForedit(hos: House) {
      this.houseService.selectedHouse = Object.assign({}, hos);
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
