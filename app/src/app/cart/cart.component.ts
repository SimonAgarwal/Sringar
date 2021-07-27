import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ActiveUser;
  response;
params;
isEmpty=false;
cartItems=[];

cartAmount:number=0;
delivery:number=0;
totalAmount;
  constructor(public server:ServerService,private router:Router,private activatedRoute: ActivatedRoute,private notification:NotificationsService) { }

  ngOnInit(): void {
    this.ActiveUser=this.server.ActiveUser;
    //get id of user from params
    this.activatedRoute.params.subscribe(params => {
     
      this.params=params;
      console.log(this.params)
    })

    //load cart
    this.server.getCartItems(this.params.id).subscribe(res=>{
      this.response=JSON.parse(res);
  this.cartItems=this.response;
  console.log(this.cartItems)
  if(this.cartItems.length==0){
    this.isEmpty=true;
    console.log(this.isEmpty); 
  }
  
   else{
this.isEmpty=false;
    //load total amount
    this.cartAmount=0;
for(let i=0;i<this.cartItems.length;i++)
    {
    this.cartAmount+=this.cartItems[i].price;
    }

    this.totalAmount=+this.cartAmount + +this.delivery;
    console.log(this.totalAmount)
  }
      
    })
    
   }

   
  removeFromCart(product){
    if(this.server.ActiveUser==undefined){
      this.router.navigate(['/login']);
    }
    else{
    this.server.removeFromCart(product).subscribe(res=>{
      console.log(res);
     this.response=res;
     if(this.response.success==false){
      this.notification.error('Error',this.response.message,{
        timeOut:1000,
        animate:'fade',
        showProgressBar:true
      })

     }
     else{
      this.cartAmount=this.cartAmount-product.price;
     this.totalAmount=this.totalAmount-product.price;
     this.notification.success('Success',this.response.message,{
      timeOut:700,
      animate:'fade',
      showProgressBar:true
    })
    setTimeout(()=>{
      this.ngOnInit();
    },700)
     
     }
      
     
     
    })
  }
  
  }


}
