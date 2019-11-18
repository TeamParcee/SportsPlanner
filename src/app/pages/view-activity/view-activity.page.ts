import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { EditActivityPage } from '../edit-activity/edit-activity.page';

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
  isTemplate;

  ngOnInit() {
  }
  async ionViewWillEnter() {
    await this.getUser();
    await this.checkIsHeadCoach();
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
    this.helper.openModal(EditActivityPage, { activity: this.activity, isTemplate: this.isTemplate })

  }
}
