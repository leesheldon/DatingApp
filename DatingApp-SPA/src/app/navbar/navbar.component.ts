import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  loggedInUserName: string;

  constructor(
    private authService: AuthService, 
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.update_Logged_In_User_Name();
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.successMsg('Logged in successfully.');

      this.update_Logged_In_User_Name();
    }, error => {
      this.alertify.errorMsg(error);
    }, () => {
      this.router.navigate(['/members']);
    });

  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.normalMsg('Logged out.');

    this.router.navigate(['/home']);
  }

  get_Logged_In_User_Name() {
    return this.authService.get_Logged_In_User_Name();
  }

  update_Logged_In_User_Name() {
    this.loggedInUserName = '';
    if (this.loggedIn)
      this.loggedInUserName = this.authService.get_Logged_In_User_Name();
  }
}
