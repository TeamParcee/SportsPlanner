import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-followers',
  templateUrl: './view-followers.page.html',
  styleUrls: ['./view-followers.page.scss'],
})
export class ViewFollowersPage implements OnInit {


  constructor(
    private userService: UserService,
    private helper: HelperService,
    private route: ActivatedRoute,
  ) { }

  followers;
  user;
  showClose;
  uid;

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();

  }
  async getUser() {
    this.route.paramMap.subscribe(async (params) => {
      let id = params.get('id');
      this.user = await this.userService.getUserFromUid(id);
      this.getFollowers();
    })
  }

  getFollowers() {
    firebase.firestore().collection("/users/")
      .where("coach", "==", this.user.coach)
      .onSnapshot((followersSnap) => {
        let followers = [];
        followersSnap.forEach(async (follower) => {
          followers.push(follower.data());
        })
        this.followers = followers;
      })
  }
  close() {
    this.helper.closeModal();
  }
}
