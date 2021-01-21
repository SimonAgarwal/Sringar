import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import{users} from '../users';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url='http://localhost:3000';
  isAuth:boolean=false;

  constructor(private http:HttpClient) { }

  register(user:users){
    return this.http.post(this.url+'/register',user,{responseType: 'text'});
  }

  login(user:users){
    return this.http.post(this.url+'/login',user,{responseType: 'text'});
  }

  logout(){
    return this.http.get(this.url+'/logout',{responseType: 'text'});
  }

  earrings(){
    return this.http.get(this.url+'/products',{responseType: 'text'});
  }

  showEarring(id){
    return this.http.get(this.url+'/products/'+id,{responseType: 'text'});
  }

}

