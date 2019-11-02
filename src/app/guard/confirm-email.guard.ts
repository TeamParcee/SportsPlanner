import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanActivate {
  
  canActivate(){
    return true
  }

  getUsers(){
    return new Promise((resolve)=>{
    })
  }
}
