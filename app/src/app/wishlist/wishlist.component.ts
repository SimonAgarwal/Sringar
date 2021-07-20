import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { CartService} from '../services/cart.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  ActiveUser;
  response;
params;
isEmpty=false;
WishlistItems=[];

cartAmount:number=0;
delivery:number=0;
totalAmount;

  constructor(public server:ServerService,private router:Router,private activatedRoute: ActivatedRoute, public cart:CartService) { }

  ngOnInit(): void {
    this.ActiveUser=this.server.ActiveUser;
    //get id of user from params
    this.activatedRoute.params.subscribe(params => {
     this.params=params;
      console.log(this.params)
    })

    //load cart
    this.server.getWishlistItems(this.params.id).subscribe(res=>{
      this.response=JSON.parse(res);
  this.WishlistItems=this.response;
  console.log(this.WishlistItems)
  if(this.WishlistItems.length==0){
    this.isEmpty=true;
    console.log(this.isEmpty); 
  }
  else{
     this.isEmpty=false;
      }
      
    })
    
   }

   removeFromWishlist(product){
    if(this.server.ActiveUser==undefined){
      this.router.navigate(['/login']);
    }
    else{
    this.server.removeFromWishlist(product).subscribe(res=>{
      console.log(res);
     this.ngOnInit();
     })
  }
  }
  moveToCart(product){
    this.removeFromWishlist(product);
   this.cart.addToCart(product);
   
  this.ngOnInit();
  }
  }
