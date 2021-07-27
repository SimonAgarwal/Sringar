import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import{users} from '../users';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url='http://localhost:3000';
  isAuth:boolean=false;
  ActiveUser=undefined;

  constructor(private http:HttpClient) { }

  register(user:users){
    return this.http.post(this.url+'/register',user,{responseType: 'text',withCredentials:true,observe:'body',headers:new HttpHeaders().append('Content-Type','application/json')});
  }

  login(user:users){
    return this.http.post(this.url+'/login',user,{responseType: 'text',withCredentials:true});
  }

  logout(){
    return this.http.get(this.url+'/logout',{responseType: 'text',withCredentials:true});
  }

  earrings(){
    return this.http.get(this.url+'/products/earrings',{responseType: 'text',withCredentials:true});
  }
  rings(){
    return this.http.get(this.url+'/products/rings',{responseType: 'text',withCredentials:true});
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
  addToWishlist(_id){
    return this.http.post(this.url+'/wishlist',_id,{responseType: 'text',withCredentials:true});
  }
  getWishlistItems(id){
    return this.http.get(this.url+'/wishlist',{responseType: 'text',withCredentials:true});
  }
  
  removeFromCart(product){
    return this.http.delete(this.url+'/'+product._id+'/removeCart',{withCredentials:true});
  }
  removeFromWishlist(product){
    return this.http.delete(this.url+'/'+product._id+'/removeWishlist',{withCredentials:true});
  }
  reset(email){
    return this.http.post(this.url+'/resetPassword',email,{responseType: 'text',withCredentials:true});
}
setPassword(user){
  return this.http.post(this.url+'/setPassword',user,{responseType: 'text',withCredentials:true});
}

}

