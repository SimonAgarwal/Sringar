import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router,ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ActiveUser;
  response;
params;
cartItems=[];
cartAmount:number=0;
delivery:number=0;
totalAmount;
  constructor(public server:ServerService,private router:Router,private activatedRoute: ActivatedRoute) { }

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
   

    //load total amount
    for(let i=0;i<this.cartItems.length;i++)
    {
    this.cartAmount+=this.cartItems[i].price;
    }

    this.totalAmount=+this.cartAmount + +this.delivery;
    console.log(this.totalAmount)
      
    })
    
   }

   removeElement(cart){
     this.cartAmount=this.cartAmount-cart.price;
     this.totalAmount=this.totalAmount-cart.price
   }


}
