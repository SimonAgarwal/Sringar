import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isAuth:boolean=false;
  response;

  constructor(public server:ServerService,private router:Router,private notification:NotificationsService) { }

  ngOnInit(): void {
    this.isAuth=this.server.isAuth;

  }
logout(){
  this.server.ActiveUser=undefined;
  this.server.isAuth=false;
this.server.logout().subscribe(res=>{
  this.response=JSON.parse(res);
  console.log(this.response)
  if(this.response.success){
    this.server.ActiveUser=undefined;
    this.server.isAuth=false;
    console.log(this.response.message);
  }
  else{
    this.notification.error('Something went wrong','Could not logout',{
      timeOut:1000,
      animate:'fade',
      showProgressBar:true
    })
  
  }

})


}
userCart(){
  if(this.server.ActiveUser){
    this.router.navigate(['/'+this.server.ActiveUser._id+'/cart'])
  }
  else{
    this.notification.info('','Kindly login first!',{
      timeOut:700,
      animate:'fade',
      showProgressBar:true
    })
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },700)
    
  }

}
userWishlist(){
  if(this.server.ActiveUser){
    this.router.navigate(['/'+this.server.ActiveUser._id+'/wishlist'])
  }
  else{
    this.notification.info('','Kindly login first!',{
      timeOut:700,
      animate:'fade',
      showProgressBar:true
    })
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },700)
  }

}
  

}
