import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result:string="";
  user={
    email:'',
    password:''
  }
  registered:string='';
  constructor(private authService:AuthService,private router:Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((res:any)=>{
      this.registered=res['registered'];
    });
    if(localStorage.getItem('token')){
      this.router.navigate(['user']);
    }
  }
  login(){
    if(this.user.email==""||this.user.password==""){
      this.result="Please enter email and password";
    }
    else{
      this.authService.login(this.user).subscribe((res:any)=>{
        if(res.token!=""){
          localStorage.setItem('token',res.token);
          this.router.navigate(['user']);
        }
        else{
          this.result="Incorrect email or password";
        }
      });
    }
  }
  register(){
    this.router.navigate(['register']);
  }
}
