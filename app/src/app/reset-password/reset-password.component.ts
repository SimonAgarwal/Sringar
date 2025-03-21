import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
user={
  email:""
  
};
response;
  constructor(private server:ServerService,private router:Router,private notification:NotificationsService) { }

  ngOnInit(): void {
  }
  reset(){
    console.log(this.user.email)
     this.server.reset(this.user).subscribe(res=>{
       console.log(res);
       this.response=JSON.parse(res);
      if(this.response.success){
        this.notification.success('',this.response.message,{
          timeOut:3000,
          animate:'fade',
          showProgressBar:true
        })
      }
      else{
        this.notification.error('',this.response.message,{
          timeOut:2000,
          animate:'fade',
          showProgressBar:true
        })
      }
     });
  }

}
