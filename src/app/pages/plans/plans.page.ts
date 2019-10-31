import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { PlanPage } from '../plan/plan.page';
import { NavController } from '@ionic/angular';
import { PlanService } from '../../services/plan.service';
import { AddPlanPage } from '../add-plan/add-plan.page';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private navCtrl: NavController,
    private planService: PlanService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  plans;
  user;
  oldMonth = "false";

  async ionViewWillEnter() {
    await this.getUser();
    this.getPlans();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  getPlans() {
    firebase.firestore().collection("plans")
      .where("coachId", "==", this.user.coach)
      .orderBy("orderDate")
      .onSnapshot((plansSnap) => {
        let plans = [];
        plansSnap.forEach((plan) => {
          plans.push(plan.data())
        })
        this.plans = plans;
      })
  }
  selectPlan(plan) {
    this.planService.currentPlan = plan;
    this.helper.closeModal();
  }
  close() {
    this.helper.closeModal();
  }
  addPlan() {
    this.helper.openModal(AddPlanPage, null)
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

  delete(plan) {

    this.helper.confirmationAlert("Delete Plan", "Are you sure you want to delete Plan on date? This can not be undone.", { denyText: "Cancel", confirmText: "Delete Plan" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("/plans/" + plan.id).then(() => {

          })
        }
      })
  }
}
