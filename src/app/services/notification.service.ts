import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private firebaseService: FirebaseService,
  ) { }


  notification: Notification;

  newNotification(recipient, message, image, link) {
    let notification: Notification = new Notification(true, recipient, message, moment().format('LLL') , image, link);
    return new Promise((resolve) => {
      this.firebaseService.addDocument("/users/" + recipient + "/notifications", { ...notification }).then(() => {
        return resolve()
      })
    })
  }

  deleteNotification(uid, id) {
    return new Promise((resolve) => {
      this.firebaseService.deleteDocument("/users/" + uid + "/notifications/" + id).then(() => {
        return resolve()
      })
    })
  }

}

export class Notification {
  constructor(
    public newItem: boolean,
    public recipient: string,
    public message: string,
    public created: string,
    public image: string,
    public link: string,

  ) { }
}
