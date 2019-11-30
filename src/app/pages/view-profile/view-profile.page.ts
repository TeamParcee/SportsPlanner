import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { ViewFollowersPage } from '../view-followers/view-followers.page';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }


  coach;
  user;
  followers;


  ngOnInit() {
  }



  async getUser() {
    this.route.paramMap.subscribe(async (map) => {
      let id = map.get('id');
      this.user = await this.userService.getUserFromUid(id);
      this.getCoach();
      this.getFollowers()
    })
  }
  async ionViewWillEnter() {
    this.getUser()
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
    firebase.firestore().collection("/users/")
      .where("coach", "==", this.user.coach)
      .onSnapshot((followersSnap) => {
        this.followers = followersSnap.size;
      })
  }
}