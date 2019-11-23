import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-followers',
  templateUrl: './view-followers.page.html',
  styleUrls: ['./view-followers.page.scss'],
})
export class ViewFollowersPage implements OnInit {


  constructor(
    private userService: UserService,
    private helper: HelperService,
  ) { }

  followers;
  user;
  showClose;

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();
    await this.getFollowers();

  }
  async getUser() {
    this.user = await this.userService.getUser();
  }

  getFollowers() {
    firebase.firestore().collection("/users/" + this.user.coach + "/followers/").onSnapshot((followersSnap) => {
      let followers = [];
      followersSnap.forEach(async (follower) => {
        let f = await this.userService.getUserFromUid(follower.data().uid);
        followers.push(f);
      })
      this.followers = followers;
    })
  }
  close() {
    this.helper.closeModal();
  }
}
