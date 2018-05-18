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

  constructor(private flatService : FlatService,private toastr: ToastrService) { }

  ngOnInit() {
    this.flatService.selectedFlat = new Flat();
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
  onSubmit(form: NgForm) {
    if (!form.value.id) {
      this.flatService.postFlat(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.flatService.getFlatList();
          this.toastr.success('New Record Added', 'Flat registered');
        })
    } 
    else {
      this.flatService.putFlat(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.flatService.getFlatList();
          this.toastr.info('Record updated', 'House register');
        });
    }
  }
}
