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
import { TimerService } from 'src/app/services/timer.service';
import { PlanOptionsPage } from '../plan-options/plan-options.page';
import { PresenceService } from 'src/app/services/presence.service';
import { NewActivityPage } from '../new-activity/new-activity.page';
import { IntroPage } from '../intro/intro.page';

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
    private timerService: TimerService,
    private presence: PresenceService,

  ) { }


  plan;
  user;
  coach;
  activities;
  date;
  orderArray;
  showTimer;
  currentActivity;
  timerStarted;
  timerInterval;
  nextActivity;
  isHeadCoach;
  endTime;
  totalTime;
  showLoading = true;

  async ionViewWillEnter() {
    setTimeout(() => {
      this.showLoading = false;
    }, 5000)
    await this.presence.onlineStatus();
    await this.getUser();
    await this.getCoachFromUid(this.user.coach);
    await this.getActivePlan();
    await this.getActivities();
    await this.checkIsHeadCoach();




  }

  checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
    } else {
      this.isHeadCoach = false
    }
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  async ngOnInit() {
    await this.getUser();
    await this.showIntro();;
    await this.getCoachFromUid(this.user.coach);
    await this.getActivePlan();
    await this.checkIsHeadCoach();
  }


  showIntro() {
    if (!this.user.showIntro) {
      this.helper.openModal(IntroPage, null)
    }

  }
  viewPlans(event) {
    this.helper.openModalPromise(PlansPage, null).then(() => {
      if (this.planService.currentPlan) {
        this.plan = this.planService.currentPlan;
        this.setLastViewedPlan();
        this.getActivities();
      }
    })

  }

  getCoachFromUid(uid) {
    this.firebaseService.getDocument("/users/" + uid).then((user) => {
      this.coach = user;
    })
  }

  async createActivity() {

    this.helper.openModalPromise(NewActivityPage, { plan: this.plan, activitiesLength: this.activities.length })
  }

  async getActivities() {

    if (this.plan) {
      if (!await this.doesPlanExist()) {
        this.plan = null;
        this.planService.currentPlan = null;
        return;
      }
      firebase.firestore().collection("/plans/" + this.plan.id + "/activities")
        .orderBy("order")
        .onSnapshot((activitySnap) => {
          this.totalTime = 0;
          let activities = [];
          this.orderArray = [];
          let time = moment(this.plan.date).format("LT");
          let minutes = 0;
          let count = 0;
          activitySnap.forEach((activity) => {
            count = count + 1;
            let a = activity.data();
            a.startTime = this.getTimeOfEvent(time, minutes);
            a.date = moment(this.date).format("MMM DD, YYYY ") + a.startTime;
            activities.push(a);
            this.orderArray.push({ order: count, id: a.id });
            time = a.startTime;
            minutes = a.duration;
            this.totalTime = this.totalTime + (minutes * 1);
            this.endTime = this.getTimeOfEvent(time, minutes);
          })
          this.activities = activities;
          this.planService.activities = activities;
          this.date = this.plan.date;
        })

    } else {
    }
  }

  doesPlanExist() {
    return new Promise((resolve) => {
      firebase.firestore().doc("/plans/" + this.plan.id).get().then((planSnap) => {
        return resolve(planSnap.exists)
      })
    })
  }
  editActivity(activity) {
    this.helper.openModalPromise(EditActivityPage, { activity: activity })
      .then(() => {
        this.getActivities()
      })
  }
  viewActivity(activity) {
    this.helper.openModalPromise(ViewActivityPage, { activity: activity, activityType: "noTemplate" })
  }

  viewCurrentActivity(activity) {
    if (this.currentActivity.time && this.currentActivity.name != "Time Until First Activity") {
      this.helper.openModalPromise(ViewActivityPage, { activity: activity })
    }
  }

  delete(activity) {
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("plans/" + activity.planId + "/activities/" + activity.id)
            .then(async () => {
              let plan: any = await this.firebaseService.getDocument("/plans/" + activity.planId);
              let activitiesCount = plan.activities;
              this.firebaseService.updateDocument("/plans/" + activity.planId, { activities: (activitiesCount - 1) });
            })
        }
      })
  }
  updateTime() {
    this.stopTimer();
    this.firebaseService.updateDocument("/plans/" + this.plan.id, { date: moment(this.date).format('llll'), orderDate: moment(this.date).format() });
    this.planService.currentPlan.date = moment(this.date).format('llll');
    this.plan.date = moment(this.date).format('llll');
    this.getActivities();
  }

  getTimeOfEvent(time, minutes) {
    let x = moment(time, "hh:mm a").add('minutes', minutes).format('LT');
    return x;
  }

  reorderItems(ev) {
    this.stopTimer();
    let from = ev.detail.from;
    let to = ev.detail.to;
    let draggedItem = this.orderArray.splice(from, 1)[0];
    this.orderArray.splice(to, 0, draggedItem);
    let count = 0;
    this.orderArray.forEach((item) => {
      count = count + 1;
      item.order = count;

    })
    ev.detail.complete();

    this.updateOrder();

  }

  updateOrder() {

    this.orderArray.forEach((activity) => {
      firebase.firestore().doc("/plans/" + this.plan.id + "/activities/" + activity.id).update({ order: activity.order })
    })

    this.getActivities();
  }

  setLastViewedPlan() {
    this.firebaseService.setDocument("/users/" + this.user.uid + "/utilities/activeplan", { plan: this.plan.id })
  }

  async getActivePlan() {
    firebase.firestore().doc("/users/" + this.user.uid + "/utilities/activeplan").onSnapshot(async (activePlanSnap) => {
      if (activePlanSnap.exists) {
        let activePlanId = activePlanSnap.data().plan;
        this.planService.currentPlan = await this.firebaseService.getDocument("plans/" + activePlanId);
        this.plan = await this.firebaseService.getDocument("plans/" + activePlanId);
        this.getActivities();
      } else {
        this.plan = false;
        this.planService.currentPlan = null;
      }
    })
  }


  runTimer() {
    this.showTimer = true;
    if (!this.timerStarted) {
      this.timerStarted = true;
      this.timerService.startPlan();
      this.timerInterval = setInterval(() => {
        this.nextActivity = this.timerService.nextActivity;
        this.currentActivity = this.timerService.currentActivity;
      }, 1000)
    }
  }

  stopTimer() {
    this.timerService.stopPlan();
    clearInterval(this.timerInterval);
    this.showTimer = false;
    this.timerStarted = false;
  }

  viewMoreOptions(event) {
    this.helper.presentPopover(event, PlanOptionsPage, null)
  }

}
