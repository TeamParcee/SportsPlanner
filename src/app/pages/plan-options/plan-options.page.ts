import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { AlertInput } from '@ionic/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-plan-options',
  templateUrl: './plan-options.page.html',
  styleUrls: ['./plan-options.page.scss'],
})
export class PlanOptionsPage implements OnInit {

  constructor(
    private planService: PlanService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private navCtrl: NavController,
  ) { }

  user;
  plan = this.planService.currentPlan;
  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  createTemplate() {
    this.helper.closePopover();
    let alertInput: AlertInput[] = [{
      name: "name",
      type: "text"
    }]
    this.helper.inputAlert("Template Name", "Please enter a name for this template", alertInput).then((result: any) => {

      let planName = result.name;
      let plan = { ...this.planService.currentPlan };
      let originalPlanId = plan.id;
      plan.name = planName;
      this.firebaseService.addDocument("/users/" + this.user.uid + "/templates", plan).then((id) => {

        firebase.firestore().doc("plans/" + originalPlanId).get().then((planSnap) => {
          planSnap.ref.collection("activities").get().then((activitesSnap) => {
            this.firebaseService.updateDocument("/users/" + this.user.uid + "/templates/" + id, { activities: activitesSnap.size })
            activitesSnap.forEach((activity) => {
              let a: any = { ...activity.data() };
              a.planId = id;
              this.firebaseService.addDocument("/users/" + this.user.uid + "/templates/" + id + "/activities", a)
            })
          })
        })
      })
    })
  }

  viewTemplates() {
    this.helper.closePopover();
    this.navCtrl.navigateForward("/view-templates")
  }
}
