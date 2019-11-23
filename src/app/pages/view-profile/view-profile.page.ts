import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';
import { ViewFollowersPage } from '../view-followers/view-followers.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
  ) { }


  coach;
  user;
  followers;


  ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.getCoach();
    await this.getFollowers();
  }

  close() {
    this.helper.closeModal();
  }
  async getCoach() {
    this.coach = await this.userService.getUserFromUid(this.user.coach)
  }

  viewFollowers() {
    this.helper.openModal(ViewFollowersPage, { showClose: true })
  }

  getFollowers() {
    firebase.firestore().collection("/users/" + this.user.coach + "/followers/").onSnapshot((followersSnap) => {
      this.followers = followersSnap.size;
    })
  }
}