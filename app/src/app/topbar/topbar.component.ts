import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isAuth:boolean=false;
  response;

  constructor(public server:ServerService,private router:Router) { }

  ngOnInit(): void {
    this.isAuth=this.server.isAuth;

  }
logout(){
this.server.logout().subscribe(res=>{
  this.response=JSON.parse(res);
  console.log(this.response)
  if(this.response.success){
    this.server.ActiveUser=undefined;
    this.server.isAuth=false;
    console.log(this.response.message);
    this.router.navigate(['/login']);
  }
  else{
    alert("Something went wrong");
  }

})


}
userCart(){
  
  if(this.server.ActiveUser){
    this.router.navigate(['/'+this.server.ActiveUser._id+'/cart'])
  }
  else{
    this.router.navigate(['/login']);
  }

}
  

}
