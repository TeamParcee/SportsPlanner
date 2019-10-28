import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { PlansPage } from '../plans/plans.page';
import { NavController } from '@ionic/angular';
import { PlanService } from '../../services/plan.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Activity } from 'src/app/classes/activity';
import * as firebase from 'firebase';
import { EditActivityPage } from '../edit-activity/edit-activity.page';

import * as moment from 'moment';
import { ViewActivityPage } from '../view-activity/view-activity.page';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  constructor(
    private helper: HelperService,
    private planService: PlanService,
    private navCtrl: NavController,
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) { }


  plan;
  user;
  coach;
  activities;
  date;
  orderArray;


  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoachFromUid(this.user.uid);
    await this.getActivities();


  }

  async getUser() {
    this.user = await this.userService.getUser();
  }
  ngOnInit() {
  }


  viewPlans(event) {
    this.helper.openModalPromise(PlansPage, null).then(() => {
      this.plan = this.planService.currentPlan;
      this.getActivities();
    })

  }

  getCoachFromUid(uid) {
    this.firebaseService.getDocument("/users/" + uid).then((user) => {
      this.coach = user;
    })
  }

  createActivity() {
    let activity: Activity = {
      name: "New Activity",
      duration: 0,
      startTime: "",
      id: "",
      notes: "",
      order: 100 + this.activities.length,
      planId: this.plan.id,

    };
    this.firebaseService.addDocument("/plans/" + this.plan.id + "/activities", activity);
    this.getActivities();
  }
  getActivities() {

    if (this.plan) {
      firebase.firestore().collection("/plans/" + this.plan.id + "/activities")
        .orderBy("order")
        .get().then((activitySnap) => {
          let activities = [];
          this.orderArray = [];
          let time = moment(this.plan.date).format("LT");
          let minutes = 0;
          let count = 0;
          activitySnap.forEach((activity) => {
            count = count + 1;
            let a = activity.data();
            a.start = this.getTimeOfEvent(time, minutes);
            activities.push(a);
            this.orderArray.push({ order: count, id: a.id });
            time = a.start;
            minutes = a.duration;
          })
          this.activities = activities;
        })
      //     .get().then((snapActivities) => {
      //       let activities = [];
      //       snapActivities.forEach((activity) => {
      //         activities.push(activity.data())
      //       })
      //       this.activities = activities;
      //       this.date = this.plan.date;
      //     })
      // } else {
    }
  }

  editActivity(activity) {
    this.helper.openModalPromise(EditActivityPage, { activity: activity })
      .then(() => {
        this.getActivities()
      })
  }
  viewActivity(activity) {
    this.helper.openModalPromise(ViewActivityPage, { activity: activity })
  }
  updateTime() {
    this.firebaseService.updateDocument("/plans/" + this.plan.id, { date: moment(this.date).format('llll') });
    this.planService.currentPlan.date = moment(this.date).format('llll');
  }

  getTimeOfEvent(time, minutes) {
    let x = moment(time, "hh:mm a").add('minutes', minutes).format('LT');
    return x;
  }
;
}
