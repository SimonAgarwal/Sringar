import { Component, OnInit } from '@angular/core';
import{users} from '../users';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:users={
    name:"",
    email:"",
    username:"",
    password:""
  } 
  response;

  constructor(private server:ServerService,private router:Router,private notification:NotificationsService) { }

  ngOnInit(): void {
    this.server.ActiveUser=undefined;
  }


  login(){
    console.log(this.user);
    this.server.login(this.user).subscribe(res=>{
      console.log(res);
      this.response=JSON.parse(res); //convert string to object
      console.log( typeof(this.response));
      if(this.response.success==true){
        console.log("You Are Logged In");
        this.notification.success('Success',this.response.message,{
          timeOut:500,
          animate:'fade',
          showProgressBar:true
        })
        setTimeout(()=>{
          this.router.navigate(['/products/earring']);
        },500)
      
        this.server.isAuth=true;
        this.server.ActiveUser=this.response.user;
        console.log(this.server.ActiveUser)
        
      }
      else{
        console.log(this.response.message)
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
