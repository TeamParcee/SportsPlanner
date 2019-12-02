import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {

  constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  activity;
  itemDelete;
  user;
  activityType;

  async getUser() {
    this.user = await this.userService.getUser()
  }
  close() {
    this.helper.closeModal();
  }
  ionViewWillEnter() {
    this.getUser();
  }
  ionViewWillLeave() {
    if (!this.itemDelete) {
      if (this.activityType == "userTemplate") {
        this.saveTemplate()
      }
      if (this.activityType == "noTemplate") {
        this.save()
      }
      if (this.activityType == "adminTemplate") {
        this.saveAdminTemplate()
      }
    }
  }
  save() {
    this.firebaseService.setDocument("plans/" + this.activity.planId + "/activities/" + this.activity.id, this.activity)
      .then(() => {
        this.close()
      })
  }
  saveTemplate() {
    this.firebaseService.setDocument("users/" + this.user.uid + "/templates/" + this.activity.planId + "/activities/" + this.activity.id, this.activity)
      .then(() => {
        this.close()
      })
  }

  saveAdminTemplate() {
    this.firebaseService.setDocument("/templates/" + this.activity.planId + "/activities/" + this.activity.id, this.activity)
      .then(() => {
        this.close()
      })
  }
  deleteTemplate() {
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity from this template", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("users/" + this.user.uid + "/templates/" + this.activity.planId + "/activities/" + this.activity.id)
            .then(async () => {
              this.itemDelete = true;
              let plan: any = await this.firebaseService.getDocument("users/" + this.user.uid + "/templates/" + this.activity.planId);
              let activitiesCount = plan.activities;
              this.firebaseService.updateDocument("users/" + this.user.uid + "/templates/" + this.activity.planId, { activities: (activitiesCount - 1) });
              this.close();
            })
        }
      })
  }
  deleteAdminTemplate() {
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity from this admin template", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("/templates/" + this.activity.planId + "/activities/" + this.activity.id)
            .then(async () => {
              this.itemDelete = true;
              let plan: any = await this.firebaseService.getDocument("/templates/" + this.activity.planId);
              let activitiesCount = plan.activities;
              this.firebaseService.updateDocument("/templates/" + this.activity.planId, { activities: (activitiesCount - 1) });
              this.close();
            })
        }
      })
  }
  delete() {
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("plans/" + this.activity.planId + "/activities/" + this.activity.id)
            .then(async () => {
              this.itemDelete = true;
              let plan: any = await this.firebaseService.getDocument("/plans/" + this.activity.planId);
              let activitiesCount = plan.activities;
              this.firebaseService.updateDocument("/plans/" + this.activity.planId, { activities: (activitiesCount - 1) });
              this.navCtrl.navigateRoot("/tabs/plan");
              this.close();
            })
        }
      })
  }

  getTypeForDelete(){
    if (this.activityType == "userTemplate") {
      this.deleteTemplate()
    }
    if (this.activityType == "noTemplate") {
      this.delete()
    }
    if (this.activityType == "adminTemplate") {
      this.deleteAdminTemplate()
    }
  }
}
