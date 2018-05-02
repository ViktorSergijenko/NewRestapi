import { Component, OnInit } from '@angular/core';
import { HouseService } from '../shared/house.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { House } from '../shared/house.model';
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(private houseService: HouseService, private toastr: ToastrService) { }

  ngOnInit() {
    // Init object with empty values
    this.houseService.selectedHouse = new House();
    // this.resetForm();
  }
  resetForm(form?: NgForm) {
    // tslint:disable-next-line:curly
    if (form != null)
      form.reset();
    this.houseService.selectedHouse = {
      id: null,
      street: '',
      city: '',
      country: '',
      postindex: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.Id == null) {
      this.houseService.postHouse(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.houseService.getHouseList();
          this.toastr.success('New Record Added', 'House registered');
        })
    } else {
      this.houseService.putHouse(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.houseService.getHouseList();
          this.toastr.info('Record updated', 'House register');
        });
    }
  }

}
