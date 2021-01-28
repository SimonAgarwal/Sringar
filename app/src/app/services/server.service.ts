import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import{users} from '../users';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url='http://localhost:3000';
  isAuth:boolean=false;
  ActiveUser;

  constructor(private http:HttpClient) { }

  register(user:users){
    return this.http.post(this.url+'/register',user,{responseType: 'text'});
  }

  login(user:users){
    return this.http.post(this.url+'/login',user,{responseType: 'text',withCredentials:true});
  }

  logout(){
    return this.http.get(this.url+'/logout',{responseType: 'text'});
  }

  earrings(){
    return this.http.get(this.url+'/products',{responseType: 'text',withCredentials:true});
  }

  showEarring(id){
    return this.http.get(this.url+'/products/'+id,{responseType: 'text'});
  }
  getCartItems(id){
    return this.http.get(this.url+'/cart',{responseType: 'text',withCredentials:true});
  }

  addToCart(_id){
    return this.http.post(this.url+'/cart',_id,{responseType: 'text',withCredentials:true});
  }
  removeFromCart(product){
    return this.http.delete(this.url+'/'+product._id+'/removeCart',{withCredentials:true});
  }

}

