import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { CartService} from '../services/cart.service';
import { NotificationsService } from 'angular2-notifications';
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

  constructor(public server:ServerService,private router:Router,private activatedRoute: ActivatedRoute, public cart:CartService,private notification:NotificationsService) { }

  ngOnInit(): void {
    this.ActiveUser=this.server.ActiveUser;
    //get id of user from params
    this.activatedRoute.params.subscribe(params => {
     this.params=params;
      console.log(this.params)
    })

    //load wishlist
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
      this.response=res;
      this.notification.success('Success',this.response.message,{
        timeOut:1000,
        animate:'fade',
        showProgressBar:true
      })
      setTimeout(()=>{
        this.ngOnInit();
      },1000)
    
     })
  }
  }
  moveToCart(product){
    this.removeFromWishlist(product);
   this.response=this.cart.addToCart(product);
   if(this.response.success){
    this.notification.success('','Moved To Cart',{
      timeOut:1000,
      animate:'fade',
      showProgressBar:true
    })
  }
  else{
    this.notification.error('','Something went wrong',{
      timeOut:1000,
      animate:'fade',
      showProgressBar:true
    })
  }
   
  this.ngOnInit();
  }
  }
