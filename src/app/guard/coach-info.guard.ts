import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CoachInfoGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private navCtrl: NavController,

  ) {

  }
  async canActivate() {
    let user: any = await this.userService.getUser();
    if (user.isHeadCoach) {
      if (!user.coachPassword || !user.sport) {
        this.navCtrl.navigateRoot("/coach-info")
      } else {
        return true;
      }
    } else {
      return true;
    }

  }


}
