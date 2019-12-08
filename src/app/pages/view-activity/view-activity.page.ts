import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { EditActivityPage } from '../edit-activity/edit-activity.page';
import { AddToPlanPage } from '../add-to-plan/add-to-plan.page';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.page.html',
  styleUrls: ['./view-activity.page.scss'],
})
export class ViewActivityPage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
  ) { }

  activity;
  user;
  isHeadCoach;
  activityType;
  hideEdit = false;
  publicDrill;

  ngOnInit() {
  }
  async ionViewWillEnter() {
    await this.getUser();
    await this.checkIsHeadCoach();
    this.showEditActivity();
  }

  close() {
    this.helper.closeModal();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
    } else {
      this.isHeadCoach = false
    }
  }
  editActivity() {
    this.helper.closeModal();
    this.helper.openModal(EditActivityPage, { activity: this.activity, activityType: this.activityType })
  }

  showEditActivity() {
    if (this.activityType == "adminTemplate") {
      if (!this.user.admin) {
        this.hideEdit = true;
      }

    }

    if (this.publicDrill) {
      this.hideEdit = true
    }
  }

  addToPlan() {
    this.helper.openModal(AddToPlanPage, { activity: this.activity })
  }
}
