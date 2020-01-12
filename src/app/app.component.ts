import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthentificated: boolean;
  title = 'app';
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    if (this.loginService.isAuthenticated()) {
      this.isAuthentificated = true;
    }
    router.events.subscribe((val) => {
      if (this.loginService.isAuthenticated()) {
        this.isAuthentificated = true;
      }
      else {
        this.isAuthentificated = false;
      }

  });
  }
  ngOnInit() {

  }

  signOut() {
    this.loginService.removeCredentials();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
