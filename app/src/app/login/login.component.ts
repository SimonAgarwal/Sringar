import { Component, OnInit } from '@angular/core';
import{users} from '../users';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

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

  constructor(private server:ServerService,private router:Router) { }

  ngOnInit(): void {
  }


  login(){
    console.log(this.user);
    this.server.login(this.user).subscribe(res=>{
      console.log(res);
      this.response=JSON.parse(res); //convert string to object
      console.log( typeof(this.response));
      if(this.response.success==true){
        console.log("You Are Logged In");
        this.server.isAuth=true;
        this.router.navigate(['/products/earring']);
      }
      else{
        alert("Something went wrong !try again")
        console.log("failed")
      }
    })

    
  }

    
}
