import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';

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

    this.firebaseService.addDocument("/plans", { date: date, startTime: startTime })
      .then(() => {
        this.navCtrl.navigateBack('/plans');
      })
  }
}
