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
  currentUserName: string;
  currentPhotoUrl: string;

  constructor(
    private authService: AuthService, 
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.setCurrentUserName();
    
    this.authService.currentPhotoUrl.subscribe(p => this.currentPhotoUrl = p);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.successMsg('Logged in successfully.');

      this.setCurrentUserName();
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
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.alertify.normalMsg('Logged out.');

    this.router.navigate(['/home']);
  }

  setCurrentUserName() {
    this.currentUserName = '';
    if (this.loggedIn()) {
      this.currentUserName = this.authService.currentUser.userName;
    }
      
  }
}
