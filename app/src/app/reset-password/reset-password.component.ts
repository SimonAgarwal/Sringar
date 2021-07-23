import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

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
  constructor(private server:ServerService,private router:Router) { }

  ngOnInit(): void {
  }
  reset(){
    console.log(this.user.email)
     this.server.reset(this.user).subscribe(res=>{
       console.log(res);
       this.response=JSON.parse(res);

     });
  }

}
