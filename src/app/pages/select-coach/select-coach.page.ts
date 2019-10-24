import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CoachService } from 'src/app/services/coach.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-select-coach',
  templateUrl: './select-coach.page.html',
  styleUrls: ['./select-coach.page.scss'],
})
export class SelectCoachPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private coachService: CoachService,
  ) { }

  ngOnInit() {
  }


  user;
  coaches;
  filterCoaches;

  async ionViewWillEnter() {
    await this.getUser();
    this.getCoaches();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  getCoaches() {
    firebase.firestore().collection("/users/").where("isHeadCoach", "==", true).onSnapshot((coachSnap) => {
      let coaches = [];
      coachSnap.forEach((coach) => {
        coaches.push(coach.data())
      })
      this.coaches = coaches;
      this.filterCoaches = [...this.coaches]
    })
  }
  updateCoachInfo() {

  }

  onSearchChange(event) {
    let value = event.detail.value.toLowerCase();
    this.filterCoaches = [];
    this.coaches.forEach(item => {
      const shouldShow = item.fname.toLowerCase().indexOf(value) > -1 || item.lname.toLowerCase().indexOf(value) > -1;
      if (shouldShow) {
        this.filterCoaches.push(item)
      }
    });

  }
}
