import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='http://localhost:3000';

  constructor(private http: HttpClient,private jwtHelper:JwtHelperService) { }

  login(user:any){
    return this.http.post(`${this.url}/user/login`,user);
  }
  register(user:any){
    return this.http.post(`${this.url}/user/register`,user);
  }
  edit(user:any){
    return this.http.post(`${this.url}/user/edit`,user);
  }
  isAuth():boolean{
    const token=localStorage.getItem('token');
    if(!token){
      return false;
    }
    return true;
  }
}
