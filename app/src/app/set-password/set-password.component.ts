import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router,ActivatedRoute} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
user={
  password:"",
  confirm:"",
  token:""

}

response
  constructor(private server:ServerService,private router:Router,private activatedRoute: ActivatedRoute,private notification:NotificationsService) { }

  ngOnInit(): void {
  }
  update(){
    console.log(this.user);
   
    //get id of user from params
    this.activatedRoute.params.subscribe(params => {
     this.user.token=params.token;
      console.log(this.user)
    })
    this.server.setPassword(this.user).subscribe(res=>{
      console.log(res);
      this.response=JSON.parse(res);
      if(this.response.success==true){
        this.notification.success('',this.response.message,{
          timeOut:2000,
          animate:'fade',
          showProgressBar:true
        })
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000)
        
      }
      else{
        this.notification.error('',this.response.message,{
          timeOut:1000,
          animate:'fade',
          showProgressBar:true
        })
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1000)
        console.log("Something went wrong!");
      }
    })
  }

}
