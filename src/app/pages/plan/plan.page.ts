import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { PlansPage } from '../plans/plans.page';
import { NavController } from '@ionic/angular';
import { PlanService } from '../../services/plan.service';

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
  ) { }


  plan;
  ngOnInit() {
    this.planService.currentPlanObs.subscribe((x) => {
      this.plan = x;
      console.log(x);
    })
  }

  ionViewWillEnter() {
    // this.plan = this.plansService.currentPlan;
  }
  viewPlans(event) {
    // this.helper.openModal(PlansPage, null)
    this.navCtrl.navigateForward("/plans")
  }

}
