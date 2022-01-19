import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import decode from 'jwt-decode';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title:string='';
  role:boolean=false;
  registered:string='';
  edited:string='';

  constructor(private route:Router,private activatedroute:ActivatedRoute) {
    const token=localStorage.getItem('token');
    if(token){
      const data:any=decode(token);
      this.title=data.role+" "+data.fname+" "+data.lname;
      const r=data.role;
      this.role=(r==='admin');
    }
    else{
      localStorage.clear();
      this.route.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((res:any)=>{
      if(res['registered']){
        this.registered=res['registered'];
      }
      else{
        this.registered=res['edit'];
      }
    });
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
  adduser(){
    this.route.navigate(['register']);
  }
  edituser(){
    this.route.navigate(['register'],{queryParams:{edit:true}});
  }
}
