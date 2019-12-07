import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { Activity } from 'src/app/classes/activity';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }


  activity: Activity = new Activity();
  plan;
  activitiesLength;

  async save() {
    let activity: Activity = {
      name: this.activity.name,
      duration: (this.activity.duration) ? this.activity.duration : 0,
      notes: (this.activity.notes) ? this.activity.notes : "",
      order: 1000 + this.activitiesLength,
      planId: this.plan.id,

    };
    let plan: any = await this.firebaseService.getDocument("/plans/" + this.plan.id);
    let activitiesCount = plan.activities;
    this.firebaseService.updateDocument("/plans/" + this.plan.id, { activities: (activitiesCount + 1) })
    this.firebaseService.addDocument("plans/" + this.plan.id + "/activities", activity)
      .then(() => {
        this.close()
      })
  }
  close() {
    this.helper.closeModal();
  }
}
