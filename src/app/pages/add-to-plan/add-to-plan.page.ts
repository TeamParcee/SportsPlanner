import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { PlanService } from 'src/app/services/plan.service';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-to-plan',
  templateUrl: './add-to-plan.page.html',
  styleUrls: ['./add-to-plan.page.scss'],
})
export class AddToPlanPage implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private helper: HelperService,
    private planService: PlanService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }


  user;
  plans;
  activity;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getPlans();
  }


  async getUser() {
    this.user = await this.userService.getUser();
  }

  myHeaderFn(record, recordIndex, records: []) {

    let month = moment(record.date).format('MMMM');

    if (recordIndex == 0) {
      return month;
    }

    let lastRecord: any = records[(recordIndex - 1)];
    let lastMonth = moment(lastRecord.date).format('MMMM');
    if (month != lastMonth) {
      return month
    } else {
      return null
    }
  }


  async save(plan) {
    let activity = {
      name: this.activity.name,
      duration: (this.activity.duration) ? this.activity.duration : 0,
      notes: (this.activity.notes) ? this.activity.notes : "",
      order: 10000,
      planId: plan.id,

    };
    let activitiesCount = plan.activities;
    let drill: any = await this.firebaseService.getDocument("/drills/" + this.activity.id)
    let plansCount = drill.plansCount;
    this.firebaseService.updateDocument("drills/" + this.activity.id, { plansCount: plansCount + 1 })
    this.firebaseService.updateDocument("/plans/" + plan.id, { activities: (activitiesCount + 1) })
    this.firebaseService.addDocument("plans/" + plan.id + "/activities", activity)
      .then(() => {
        this.close()
      })
  }

  selectPlan(plan) {
    this.helper.confirmationAlert("Select Plan", "Are you sure you want to add this drill to your practice plan?", { denyText: "Cancel", confirmText: "Add To Plan" })
      .then((result) => {
        if (result) {
          this.save(plan)
        }
      })
  }
  close() {
    this.helper.closeModal();
  }



  getPlans() {
    firebase.firestore().collection("plans")
      .where("coachId", "==", this.user.coach)
      .where("sport", "==", this.user.sport)
      .orderBy("orderDate")
      .onSnapshot(async (plansSnap) => {
        let plans = [];
        plansSnap.forEach(async (plan) => {
          let p = { ...plan.data() }
          plans.push(p);
        })
        this.plans = plans;
      })
  }
}
