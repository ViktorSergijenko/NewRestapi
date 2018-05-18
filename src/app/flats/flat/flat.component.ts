import { Component, OnInit } from '@angular/core';
import {FlatService} from '../shared/flat.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Flat } from '../shared/flat.model';
@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.css']
})
export class FlatComponent implements OnInit {

  constructor(private flatService : FlatService) { }

  ngOnInit() {
  }
  resetForm(form: NgForm) {
    // tslint:disable-next-line:curly
    if (form != null)
      form.reset();
    this.flatService.selectedFlat = {
      id: null,
      floor: null,
      number: null,
      totalarea: null,
      livingspace: null,
      houseid: null
      
    }
  }
  // onSubmit(form: NgForm) {
  //   if (!form.value.id) {
  //     this.houseService.postHouse(form.value)
  //       .subscribe(data => {
  //         this.resetForm(form);
  //         this.houseService.getHouseList();
  //         this.toastr.success('New Record Added', 'House registered');
  //       })
  //   } 
  //   else {
  //     this.houseService.putHouse(form.value.id, form.value)
  //       .subscribe(data => {
  //         this.resetForm(form);
  //         this.houseService.getHouseList();
  //         this.toastr.info('Record updated', 'House register');
  //       });
  //   }
}
