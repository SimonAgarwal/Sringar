import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import{earring} from '../earring';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  params;
  response;
  earring:earring


  constructor(private server:ServerService,private router:Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.params=params;
    })
    this.server.showEarring(this.params.id).subscribe(res=>{
      this.response=JSON.parse(res);
      this.earring=this.response.product
      console.log(this.earring)
    })
    
   }

  ngOnInit(): void {
    //get id object from route
    }


}
