import { Component, OnInit } from '@angular/core';
import {HouseService} from '../shared/house.service';
import { House } from '../shared/house.model';
import {ToastrService} from 'ngx-toastr';
import { FlatService } from '../../flats/shared/flat.service';
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
      
      // nuzno dlja togo wtobi izmenenija v objekte sohranjalisj ne srazu
      this.houseService.selectedHouse = Object.assign({}, hos);
    }
    showInfoAboutHouse(id:number){
      this.houseService.getFlatListAsAdditionalInformationAboutHouse(id);
    }

    onDelete(id: number) {
      if (confirm('Are you sure to delete this record ?') === true) {
      this.houseService.deleteHouse(id)
      .subscribe(x => {
        this.houseService.getHouseList();
        this.toastr.warning('Deleted :)', 'House Register');
      })
      }
     }
}
