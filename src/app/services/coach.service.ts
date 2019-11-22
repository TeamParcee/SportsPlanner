import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(
    private firebaseService: FirebaseService,
    private notificationService: NotificationService,
    private userService: UserService,
  ) { }




  async addFollower(coach, uid) {
    let user: any = await this.userService.getUserFromUid(uid);
    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + coach + "/followers/" + uid, { uid: uid }).then(() => {
        this.notificationService.newNotification(coach, user.fname + " " + user.lname + " has added you as their coach", user.photoUrl, "");
        return resolve()
      })
    })
  }

  async deleteFollower(coach, uid) {
    let user: any = await this.userService.getUserFromUid(uid);
    return new Promise((resolve) => {
      this.firebaseService.deleteDocument("/users/" + coach + "/followers/" + uid).then(() => {
        this.notificationService.newNotification(coach, user.fname + " " + user.lname + " has removed you as their coach",  user.photoUrl, "");
        return resolve()
      })
    })
  }

}
