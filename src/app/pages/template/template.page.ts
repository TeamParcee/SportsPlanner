import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { ViewActivityPage } from '../view-activity/view-activity.page';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }
  close() {
    this.helper.closeModal();
  }

  plan;
  orderArray;
  activities;
  user

  async ionViewWillEnter() {
    await this.getUser();
    await this.getActivities();
  }


  async getUser() {
    this.user = await this.userService.getUser()
  }

  getActivities() {
    if (this.plan) {
      firebase.firestore().collection("/users/" + this.user.uid + "/templates/" + this.plan.id + "/activities")
        .orderBy("order")
        .onSnapshot((activitySnap) => {
          let activities = [];
          this.orderArray = [];
          let count = 0;
          activitySnap.forEach((activity) => {
            console.log(activity.data().order);
            count = count + 1;
            let a = activity.data();
            activities.push(a);
            this.orderArray.push({ order: count, id: a.id });
          })
          this.activities = activities;
        })
    }
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
      firebase.firestore().doc("/users/" + this.user.uid + "/templates/" + this.plan.id + "/activities/" + activity.id).update({ order: activity.order })
    })
    this.getActivities();
  }

  viewActivity(activity) {
    this.helper.openModalPromise(ViewActivityPage, { activity: activity, isTemplate: true })
  }

  async createActivity() {
    let activity = {
      name: "New Activity",
      duration: 0,
      startTime: "",
      id: "",
      notes: "",
      order: 1000 + this.activities.length,
      planId: this.plan.id,

    };
    console.log(activity.order)
    this.firebaseService.addDocument("/users/" + this.user.uid + "/templates/" + this.plan.id + "/activities" + activity.id, activity);
    let plan: any = await this.firebaseService.getDocument("/users/" + this.user.uid + "/templates/" + this.plan.id);
    let activitiesCount = plan.activities;
    this.firebaseService.updateDocument("/users/" + this.user.uid + "/templates/" + this.plan.id, { activities: (activitiesCount + 1) })
    this.getActivities();
  }
}
