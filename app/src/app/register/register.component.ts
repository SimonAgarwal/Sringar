import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import{users} from '../users';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:users={
    name:"",
    email:"",
    username:"",
    password:""
  } 
  response;

  constructor(private server:ServerService,private router:Router,private notification:NotificationsService) { }

  ngOnInit(): void {
   

  }

  register(){
    console.log(this.user);
    this.server.register(this.user).subscribe((res)=>{
      console.log( typeof(res));
      this.response=JSON.parse(res); //convert string to object
      console.log( typeof(this.response));
      if(this.response.success==true){
        console.log("registered");
        this.notification.success('Success',this.response.message,{
          timeOut:2000,
          animate:'fade',
          showProgressBar:true
        })
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000)
      }
      else{
        this.notification.error('Error',this.response.message,{
          timeOut:2000,
          animate:'fade',
          showProgressBar:true
        })
        console.log("failed")
      }

   
    })

  }

}
