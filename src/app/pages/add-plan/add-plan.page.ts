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
    let date =  moment(moment(this.date).format("MMM DD, YY") + " " + moment(this.startTime).format("LT")).format('llll');
    let orderDate = moment(date).format()
    this.firebaseService.addDocument("/plans", { date: date, coachId: this.user.uid, orderDate: orderDate })
      .then(() => {
        this.close();
      })
  }
  close() {
    this.helper.closeModal();
  }
}
