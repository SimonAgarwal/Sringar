import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kurti',
  templateUrl: './kurti.component.html',
  styleUrls: ['./kurti.component.css']
})
export class KurtiComponent implements OnInit {
 /* products=[
    {image:'https://i.ibb.co/t3PnpTf/ear1.jpg'},
    {image:'https://i.ibb.co/rs8Xm5F/ear2.jpg'},
    {image:'https://i.ibb.co/6RrLJRK/ear3.jpg'},
    {image:'https://i.ibb.co/QdLc85f/ear4.jpg'},
    {image:'https://i.ibb.co/FzvSWZM/ear5.jpg'},
    {image:'https://i.ibb.co/hLVTm1d/ear6.jpg'},
    {image:'https://i.ibb.co/64pdRR7/ear7.jpg'},
    {image:'https://i.ibb.co/pZp5FBf/ear8.jpg'},
    {image:'https://i.ibb.co/T855Qr7/ear9.jpg'},
    {image:'https://i.ibb.co/tB64Nh4/ear10.jpg'},
    {image:'https://i.ibb.co/HgcS0rP/ear11.jpg'},
    {image:'https://i.ibb.co/0Qbff49/ear12.jpg'}
  ]*/

products:any;
response

  constructor(private server:ServerService,private router:Router,public cart:CartService) { }
addedWish:String;

  ngOnInit(): void {
    this.server.earrings().subscribe(res=>{
      this.response=JSON.parse(res);
      this.products=this.response.products;
      this.server.ActiveUser=this.response.user;
      console.log(this.products);
      
    })
  }
  wishlist(){
    this.addedWish='iconWish';
  }
  

}
