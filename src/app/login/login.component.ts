import { Component, OnInit } from '@angular/core';
import { LoginService, LoginCredentials } from '../shared/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userIsLoggedIn: boolean;
  credentials: LoginCredentials =  new LoginCredentials();
  

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.checkIfIsAuthenticated();
    }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
   if (this.credentials.username === 'admin' && this.credentials.password === '123456') {
     this.loginService.setCredentials(this.credentials);
     this.toastr.success('Hello master', 'Welcome back');
     this.router.navigate([this.route.snapshot.queryParams.redirect || '/houses'], { replaceUrl: true });
   } else {
     this.toastr.error('Error', 'Wrong credentials');
     this.credentials =  new LoginCredentials();
   }
  }


  goAsGuest() {
    this.credentials.username = 'guest';
    this.loginService.setCredentials(this.credentials);
    this.router.navigate([this.route.snapshot.queryParams.redirect || '/houses'], { replaceUrl: true });
  }

  checkIfIsAuthenticated() {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate([this.route.snapshot.queryParams.redirect || '/houses'], { replaceUrl: true });
    }
  }

}
