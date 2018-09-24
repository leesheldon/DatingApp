import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Login successfully.');  
    }, error => {
      console.log(error);
    });

    console.log(this.model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // If token is not empty --> return True Else return False.
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out.');
  }

}
