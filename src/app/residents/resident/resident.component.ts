import { Component, OnInit } from '@angular/core';
import {ResidentService} from '../shared/resident.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Resident } from '../shared/resident.model';
@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {

  constructor(private residentService : ResidentService,private toastr: ToastrService) { }

  ngOnInit() {
    this.residentService.selectedResident = new Resident();
  }
  resetForm(form: NgForm) {
    // tslint:disable-next-line:curly
    if (form != null)
      form.reset();
    this.residentService.selectedResident = {
      id: null,
      firstname: '',
      lastname: '',
      postcode: '',
      phone: '',
      email: '',
      flatid:null
      
    }
  }
  onSubmit(form: NgForm) {
    if (!form.value.id) {
      this.residentService.postResident(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.residentService.getResidentList();
          this.toastr.success('New Record Added', 'Resident registered');
        })
    } 
    else {
      this.residentService.putResident(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.residentService.getResidentList();
          this.toastr.info('Record updated', 'Resident register');
        });
    }
  }
}