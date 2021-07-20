import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private server:ServerService,private router:Router) { }

  addToCart(product){
    if(this.server.ActiveUser==undefined){
      this.router.navigate(['/login']);
    }
    else{
    this.server.addToCart(product).subscribe(res=>{
      console.log(res);
    })
  }
  }

  addToWishlist(product){
    if(this.server.ActiveUser==undefined){
      this.router.navigate(['/login']);
    }
    else{
    this.server.addToWishlist(product).subscribe(res=>{
      console.log(res);
    })
  }
  }
}
