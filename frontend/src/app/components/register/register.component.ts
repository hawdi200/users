import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private url='http://localhost:3000';
  user={
    id:'',
    fname:'',
    lname:'',
    email:'',
    password:'',
    role:''
  }
  registeruser:boolean=true;
  edituser:boolean=false;
  result:string='';
  title:string='Register';

  constructor(private authService:AuthService,private router:Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((res:any)=>{
      if(res['edit']){ 
        let token=localStorage.getItem('token');
        if(token){
          const data:any=decode(token);
          this.user.fname=data.fname;
          this.user.lname=data.lname;
          this.user.email=data.email;
          this.user.role=data.role;
          this.user.password=data.password;
          this.user.id=data.id;
          this.title='Edit user';
          this.edituser=true;
          this.registeruser=false;
        }
      }
    });
  }
  register(){
    if(this.user.fname==''||this.user.lname==''||this.user.email==''||this.user.password==''){
      this.result="All fields are required";
    }
    else if(!ValidateEmail(this.user.email)){
      this.result="Wrong email format";
    }
    else{
      this.authService.register(this.user).subscribe((res:any)=>{
        if(res=='Email already exists'){
          this.result=res.result;
        }
        else{
          let token=localStorage.getItem('token');
          if(token!==undefined){
            this.router.navigate(['user'],{queryParams:{registered:'Registered successfully'}});
          }
          else{
            this.router.navigate(['login'],{queryParams:{registered:'Registered successfully'}});
          }
        }
      });
    }
  }
  edit(){
    if(this.user.fname==''||this.user.lname==''||this.user.email==''||this.user.password==''){
      this.result="All fields are required";
    }
    else{
      this.authService.edit(this.user).subscribe((res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigate(['user'],{queryParams:{edit:"Updated user"}})
      });
    }
  }
}
function ValidateEmail(email:any) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return (true)
    }
    else{
      return false;
    }
}
