import { Component, OnInit } from '@angular/core';
import {HouseService} from '../shared/house.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(private houseService: HouseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
resetForm(form?: NgForm) {
  // tslint:disable-next-line:curly
  if (form != null)
  form.reset();
  this.houseService.selectedHouse = {
    Id : null,
    Street : '',
    City : '',
    Country : '',
    Created : null,
    Postindex : '',
    Modified : null
  };
 }
 onSubmit(form: NgForm) {
    this.houseService.postHouse(form.value)
    .subscribe( data => {
      this.resetForm(form);
      this.toastr.success('New Record Added', 'House registered');
    });
  }
}
