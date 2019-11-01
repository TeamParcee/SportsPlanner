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


  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoachFromUid(this.user.uid);
    await this.getActivePlan();
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
      this.setLastViewedPlan();
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
            a.startTime = this.getTimeOfEvent(time, minutes);
            a.date = this.plan.date;
            activities.push(a);
            this.orderArray.push({ order: count, id: a.id });
            time = a.startTime;
            minutes = a.duration;
          })
          this.activities = activities;
          this.planService.activities = activities;
          this.date = this.plan.date;
        })

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
    this.firebaseService.updateDocument("/plans/" + this.plan.id, { date: moment(this.date).format('llll'), orderDate: moment(this.date).format() });
    this.planService.currentPlan.date = moment(this.date).format('llll');
    this.getActivities();
  }

  getTimeOfEvent(time, minutes) {
    let x = moment(time, "hh:mm a").add('minutes', minutes).format('LT');
    return x;
  }
  reorderItems(ev) {
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
    firebase.firestore().doc("/users/" + this.user.uid + "/utilities/activeplan").get().then(async (activePlanSnap) => {
      if (activePlanSnap.exists) {
        let activePlanId = activePlanSnap.data().plan;
        this.planService.currentPlan = await this.firebaseService.getDocument("plans/" + activePlanId);
        this.plan = await this.firebaseService.getDocument("plans/" + activePlanId);
        this.date = this.plan.date;
        this.getActivities();
      }
    })
  }

  
  runTimer(){
      this.showTimer = true;
      if (!this.timerStarted){
        this.timerStarted = true;
        this.timerService.startPlan();  
        this.timerInterval = setInterval(()=>{
          this.nextActivity = this.timerService.nextActivity;
          this.currentActivity = this.timerService.currentActivity;
        }, 1000)
      }
        
    }
    stopTimer(){
      this.timerService.stopPlan();
      clearInterval(this.timerInterval);
      this.showTimer = false;
      this.timerStarted = false;
    }


}
