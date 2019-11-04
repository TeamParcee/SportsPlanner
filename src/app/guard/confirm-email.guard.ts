import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanActivate {
  
  constructor(
    private navCtrl: NavController,
    private router: Router,
  ){}
  async canActivate(){
    if(await this.getEmailVerified()){
      return true
    } else {
      this.router.navigateByUrl("confirm-email")
    }
  }

  getEmailVerified(){
    return new Promise((resolve)=>{
      firebase.auth().onAuthStateChanged((user)=>{
        return resolve(user.emailVerified)
      })
    })
  }
}
