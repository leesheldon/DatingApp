import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);            
          }
        })
      )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token; // If token is not empty --> return True Else return False.

    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  get_Logged_In_User_Name() {
    const token = localStorage.getItem('token');
    let userName = '';

    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      userName = this.decodedToken.unique_name;
    }
    
    return userName;
  }

}
