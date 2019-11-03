import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SelectCoachGuard implements  CanActivate{

constructor(
  private userService: UserService,
  private navCtrl: NavController,
){

}
async canActivate(){
  let user:any = await this.getUser();
  if(user.coach){
    return true;
  } else {
    this.navCtrl.navigateForward("/select-coach")
  }
}

async getUser(){
  return await this.userService.getUser(); 
}
}
