import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private server:ServerService,private router:Router){}
  canActivate():boolean{
    if(this.server.isAuth)
    return true;
    else{
      this.router.navigate(['/login'])
      return false;
    }

  }
  
}
