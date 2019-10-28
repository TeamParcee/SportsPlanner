import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private navCtrl: NavController,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }

  date;
  startTime;
  user;

  ionViewWillEnter() {
    this.getUser();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  createPlan() {
    let date = moment(this.date).format('ll');
    let startTime = moment(this.startTime).format('LT');

    this.firebaseService.addDocument("/plans", { date: date, startTime: startTime, coachId: this.user.uid })
      .then(() => {
        this.close();
      })
  }
  close() {
    this.helper.closeModal();
  }
}
