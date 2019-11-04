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
    this.getSport()
  }
  ionViewWillLoad() {
    this.getSport();
  }
  user;
  sport;


  async getSport() {
    this.user = await this.userService.getUser();
    firebase.firestore().doc("/users/" + this.user.uid).onSnapshot((user) => {
      firebase.firestore().doc("/users/" + user.data().coach).get().then((userSnap) => {
        let sport = userSnap.data().sport;
        if (sport == "football") {
          this.sport = "american-football";
        }
        if (sport == "volleyball") {
          this.sport = "football";
        }
        if (sport == "basketball") {
          this.sport = "basketball";
        }
        if (sport == "soccer") {
          this.sport = "football";
        }
      })
    })



  }
}
