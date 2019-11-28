import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CoachService } from 'src/app/services/coach.service';
import * as firebase from 'firebase';
import { AlertController, NavController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-select-coach',
  templateUrl: './select-coach.page.html',
  styleUrls: ['./select-coach.page.scss'],
})
export class SelectCoachPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private coachService: CoachService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }


  user;
  coaches;
  filterCoaches;

  async ionViewWillEnter() {
    await this.getUser();
    this.getCoaches();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  getCoaches() {
    firebase.firestore().collection("/users/")
      .where("isHeadCoach", "==", true).onSnapshot((coachSnap) => {
        let coaches = [];
        coachSnap.forEach((coach) => {
          coaches.push(coach.data())
        })
        this.coaches = coaches;
        this.filterCoaches = [...this.coaches]
      })
  }
  async updateCoach(coach) {
    await this.coachService.deleteFollower(this.user.coach, this.user.uid);
    this.firebaseService.updateDocument("/users/" + this.user.uid, { coach: coach.uid, sport: coach.sport })
      .then(async () => {
        this.firebaseService.deleteDocument("/users/" + this.user.uid + "/utilities/activeplan");
        await this.coachService.addFollower(coach.uid, this.user.uid);
        this.helper.okAlert("Coach Updated", "Your coach has been updated to Coach " + coach.lname);
        this.navCtrl.navigateBack("/tabs/profile")
      })
  }

  onSearchChange(event) {
    let value = event.detail.value.toLowerCase();
    this.filterCoaches = [];
    this.coaches.forEach(item => {
      const shouldShow = item.fname.toLowerCase().indexOf(value) > -1 || item.lname.toLowerCase().indexOf(value) > -1;
      if (shouldShow) {
        this.filterCoaches.push(item)
      }
    });
  }

  selectCoach(coach) {
    this.updateCoach(coach);
  }

  checkPassword(coach) {
    let password = coach.coachPassword;
    let alertInput: AlertInput[] = [{
      name: "password",
      type: "password",
      placeholder: "Coach Password"
    }]
    this.helper.inputAlert("Coach Password", "Please enter the coach's password to add them as your Coach.", alertInput)
      .then((result: any) => {
        let correctPassword = result.password == password;
        if (correctPassword) {
          this.updateCoach(coach)
        } else {
          this.helper.okAlert("Incorrect Password", "Sorry, that was not the correct password for this coach")
        }
      })
  }
}
