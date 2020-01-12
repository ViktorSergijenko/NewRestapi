import { Component, OnInit } from '@angular/core';
import { FlatService } from '../shared/flat.service';
import { Flat } from '../shared/flat.model';
import { ToastrService } from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core';
import { LoginService } from '../../shared/login.service';
@Component({
  selector: 'app-flats-list',
  templateUrl: './flats-list.component.html',
  styleUrls: ['./flats-list.component.css']
})


export class FlatsListComponent implements OnInit {
  isAdmin: boolean;

  constructor(private flatService: FlatService, private toastr: ToastrService, private loginService: LoginService) {
    if (this.loginService.checkIfAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
   }

  ngOnInit() {
    this.flatService.getFlatList();
    this.flatService.getHouseListForDropDown();
  }



  showForedit(fla: Flat) {
    // nuzno dlja togo wtobi izmenenija v objekte sohranjalisj ne srazu
    this.flatService.selectedFlat = Object.assign({}, fla);
  }
  ShowInfo2(houseid: number) {
    this.flatService.getHouseList2(houseid);
    // this.myFunc();
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.flatService.deleteFlat(id)
        .subscribe(x => {
          this.flatService.getFlatList();
          this.toastr.warning('Deleted :)', 'House Register');
        });
    }
  }
}
