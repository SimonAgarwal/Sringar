import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import{users} from '../users';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

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

  constructor(private server:ServerService,private router:Router) { }

  ngOnInit(): void {
   

  }

  register(){
    console.log(this.user);
    this.server.register(this.user).subscribe((res)=>{
      console.log( typeof(res));
      this.response=JSON.parse(res); //convert string to object
      console.log( typeof(this.response));
      if(this.response.success==true){
        console.log("registered")
        this.router.navigate(['/login']);
      }
      else{
        alert("Something went wrong !try again")
        console.log("failed")
      }

   
    })

  }

}
