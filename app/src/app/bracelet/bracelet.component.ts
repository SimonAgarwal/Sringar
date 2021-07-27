import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-bracelet',
  templateUrl: './bracelet.component.html',
  styleUrls: ['./bracelet.component.css']
})
export class BraceletComponent implements OnInit {
  products:any;
response

  constructor(private server:ServerService,private router:Router,public cart:CartService,private notification:NotificationsService) { }

  ngOnInit(): void {
    this.server.bracelets().subscribe(res=>{
      this.response=JSON.parse(res);
      this.products=this.response.products;
      if(this.response.user){
        this.server.ActiveUser=this.response.user;
        this.server.isAuth=true
      }
      else{
        this.server.ActiveUser=undefined;
        this.server.isAuth=false
      }
     
      console.log(this.products);
      
    })
  }

  addToCart(product){
    console.log(this.server.ActiveUser)
    if(this.server.ActiveUser==undefined){
     
      this.notification.error('','Kindly Login First!',{
        timeOut:1000,
        animate:'fade',
        showProgressBar:true
      })
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },1000)
    }
    else{
      this.response=this.cart.addToCart(product);
      if(this.response.success){
        this.notification.success('','Added To Cart',{
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
    }
  }

  addToWishlist(product){
    console.log(this.server.ActiveUser)
    if(this.server.ActiveUser==undefined){
     
      this.notification.error('','Kindly Login First!',{
        timeOut:1000,
        animate:'fade',
        showProgressBar:true
      })
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },1000)
    }
    else{
      this.response=this.cart.addToWishlist(product);
      if(this.response.success){
        this.notification.success('','Added To Wishlist',{
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
    }

  }

}
