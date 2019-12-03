import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getSport();
    this.getNotifications();
    this.getNewMessages()
  }

  user;
  sport;
  newCount;
  volleyball;
  newMessages;

  async getSport() {
    this.user = await this.userService.getUser();
    firebase.firestore().doc("/users/" + this.user.uid).onSnapshot((user) => {
      firebase.firestore().doc("/users/" + user.data().coach).get().then((userSnap) => {
        let sport = userSnap.data().sport;
        if (sport == "football") {
          this.volleyball = false;
          this.sport = "american-football";
        }
        if (sport == "volleyball") {
          this.volleyball = true;
          this.sport = "calendar";
        }
        if (sport == "basketball") {
          this.volleyball = false;
          this.sport = "basketball";
        }
        if (sport == "soccer") {
          this.volleyball = false;
          this.sport = "football";
        }
      })
    })
  }

  async getNotifications() {
    let user: any = await this.userService.getUser();
    firebase.firestore().collection("/users/" + user.uid + "/notifications")
      .where("newItem", "==", true)
      .onSnapshot((notificationsSnap) => {
        this.newCount = notificationsSnap.size;
      })
  }

  async getNewMessages() {
    let user: any = await this.userService.getUser();
    firebase.firestore().collection("/users/" + user.uid + "/messageLists")
      .where("new", "==", true)
      .onSnapshot((messageListsSnap) => {
        this.newMessages = messageListsSnap.size;
        console.log(this.newMessages)
      })
  }

}
