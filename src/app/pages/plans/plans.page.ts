import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { PlanPage } from '../plan/plan.page';
import { NavController } from '@ionic/angular';
import { PlanService } from '../../services/plan.service';

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
  ) { }

  ngOnInit() {
  }

  plans;
  user;

  async ionViewWillEnter() {
    await this.getUser();
    this.getPlans();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  getPlans() {
    firebase.firestore().collection("/users/" + this.user.uid + "/plans").onSnapshot((plansSnap) => {
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
  close(){
    this.helper.closeModal();
  }
}
