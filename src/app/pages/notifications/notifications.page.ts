import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { NotificationService } from 'src/app/services/notification.service';
import { HelperService } from 'src/app/services/helper.service';
import * as firebase from 'firebase';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
  ) { }

  user;
  newNotifications;
  oldNotifications;


  ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.getUser();
    await this.getNewNotifications();
    await this.getOldNotifications();
  }

  async ionViewWillLeave() {
    this.changeNewNotificationsOld();
  }


  async getUser() {
    this.user = await this.userService.getUser();
  }

  async getNewNotifications() {
    firebase.firestore().collection("/users/" + this.user.uid + "/notifications")
      .where("newItem", "==", true)
      .orderBy("created", "desc")
      .onSnapshot((notificationsSnap) => {
        let notifications = [];
        notificationsSnap.forEach((notification) => {
          notifications.push(notification.data())
        })
        this.newNotifications = notifications;
      })
  }

  async getOldNotifications() {
    firebase.firestore().collection("/users/" + this.user.uid + "/notifications")
      .where("newItem", "==", false)
      .orderBy("created", "desc")
      .onSnapshot((notificationsSnap) => {
        let notifications = [];
        notificationsSnap.forEach((notification) => {
          notifications.push(notification.data())
        })
        this.oldNotifications = notifications;
      })
  }

  changeNewNotificationsOld() {
    this.newNotifications.forEach((notification) => {
      this.firebaseService.updateDocument("/users/" + this.user.uid + "/notifications/" + notification.id, { newItem: false })
    })
  }

  delete(notification) {
    this.notificationService.deleteNotification(this.user.uid, notification.id)
  }
}
