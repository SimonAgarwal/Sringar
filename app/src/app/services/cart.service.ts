import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  message='';
  response
  constructor(private server:ServerService,private router:Router,private notification:NotificationsService) { }

  addToCart(product):any{
  /*if(this.server.ActiveUser==undefined){
      this.router.navigate(['/login']);
    }
    else{*/
      this.server.addToCart(product).subscribe(res=>{
      console.log(res);
      this.response=JSON.parse(res);
    })
  //}
  return this.response
  }

  addToWishlist(product):any{
    /*if(this.server.ActiveUser==undefined){
      this.router.navigate(['/login']);
    }
    else{*/
    this.server.addToWishlist(product).subscribe(res=>{
      console.log(res);
      this.response=JSON.parse(res);
    })
 // }
 return this.response
  }
}
