import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {

  constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    console.log(this.activity)
  }

  activity;
  itemDelete;

  close() {
    this.helper.closeModal();
  }
  ionViewWillLeave() {
    if (!this.itemDelete) {
      this.save()
    }

  }
  save() {
    this.firebaseService.setDocument("plans/" + this.activity.planId + "/activities/" + this.activity.id, this.activity)
      .then(() => {
        this.close()
      })
  }

  delete() {
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("plans/" + this.activity.planId + "/activities/" + this.activity.id)
            .then(async() => {
              this.itemDelete = true;
              let plan: any = await this.firebaseService.getDocument("/plans/" + this.activity.planId);
              let activitiesCount = plan.activities;
              this.firebaseService.updateDocument("/plans/" + this.activity.planId, { activities: (activitiesCount - 1) })
              this.close()
            })
        }
      })
  }
}
