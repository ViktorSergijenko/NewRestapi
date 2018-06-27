import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../shared/resident.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Resident } from '../shared/resident.model';
@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {

  constructor(private residentService: ResidentService, private toastr: ToastrService) { }
  /**
   * fucntion that will ensure that when our project will be initialized
   * the fucntions that are in it will be immediately called
   * in our case it just create a new Resident object
   * @memberof ResidentComponent ResidentComponent-Component that contains all needed fucntions to work with register form
   */
  ngOnInit() {
    this.residentService.selectedResident = new Resident();
  }
  /**
   *function will reset all values in registration form to default
   *
   * @param {NgForm} form form-NgForm in our case it is registration form
   * @memberof ResidentComponent ResidentComponent-Component that contains all needed fucntions to work with register form
   */
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
      flatid: null,
      flat: null
    };
  }
  /**
   * Fucntion responds for submit button action,if our object wont have an id
   * (when we are adding info in reg form we cant change our id value),so if id is null and
   * we will press submit,then fucntion will send a post http request to add a new object
   * else,if object has an id then it will send a put http request to modefy existing ob ject in database
   * @param {NgForm} form form-NgForm in our case it is registration form
   * @memberof ResidentComponent ResidentComponent-Component that contains all needed fucntions to work with register form
   */
  onSubmit(form: NgForm) {
    if (!form.value.id) {
      this.residentService.postResident(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.residentService.getResidentList();
          this.toastr.success('New Record Added', 'Resident registered');
        });
    } else {
      this.residentService.putResident(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.residentService.getResidentList();
          this.toastr.info('Record updated', 'Resident register');
        });
    }
  }
}
