import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { FirebaseService } from '../services/firebase.service';
import { HelperService } from '../services/helper.service';
import { IntroPage } from '../pages/intro/intro.page';

@Injectable({
  providedIn: 'root'
})
export class SeenIntroGuard implements CanActivate {

  constructor(
    private userServcie: UserService,
    private firebaseService: FirebaseService,
    private helper: HelperService,
  ) { }



  async canActivate() {
    let user: any = await this.userServcie.getUser();

    if (!user.seenIntro) {
      this.helper.openModal(IntroPage, null)
      return false;
    } else {
      return true
    }

  }



}
