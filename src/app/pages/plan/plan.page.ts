import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { PlansPage } from '../plans/plans.page';
import { NavController } from '@ionic/angular';
import { PlanService } from '../../services/plan.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Activity } from 'src/app/classes/activity';
import * as firebase from 'firebase';

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

  async ionViewWillEnter() {
    await this.getUser();
    this.getCoachFromUid(this.user.uid);

    console.log(this.plan);
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
      planId: this.plan.id,

    };
    this.firebaseService.addDocument("/plans/" + this.plan.id + "/activities", activity)
  }
  getActivities() {
    firebase.firestore().collection("/plans/" + this.plan.id + "/activities")
    .where("uid", "==", this.user.uid)
    .onSnapshot((snapActivities) => {
      let activities = [];
      snapActivities.forEach((activity) => {
        activities.push(activity.data())
      })
      this.activities = activities;
      console.log(this.activities)
    })
  }
}
