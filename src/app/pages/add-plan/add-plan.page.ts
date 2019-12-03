import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/services/notification.service';

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
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
  }

  date;
  startTime;
  user;
  templates;
  sptemplates;
  template;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getTemplates();

  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  createPlan() {
    let date = moment(moment(this.date).format("MMM DD, YY") + " " + moment(this.startTime).format("LT")).format('llll');
    let orderDate = moment(date).format();
    let plan = { date: date, coachId: this.user.uid, orderDate: orderDate, sport: this.user.sport, activities: 0 };
    if (this.template == "" || !this.template || this.template == "none") {
      this.firebaseService.addDocument("/plans", plan)
        .then(() => {
          firebase.firestore().collection("/users/" + this.user.uid + "/followers").get().then((followersSnap) => {
            followersSnap.forEach((follower) => {
              this.notificationService.newNotification(follower.data().uid, "Coach " + this.user.lname + " has added a new practice", this.user.photoUrl, "").then(() => {
              })
            })
          }).then(() => {
            this.close();
          })
        })
    } else {

      this.firebaseService.addDocument("/plans", plan)
        .then((id) => {
          firebase.firestore().collection("users/" + this.user.uid + "/templates/" + this.template + "/activities").get().then((activitiesSnap) => {
            this.firebaseService.updateDocument("/plans/" + id, { activities: activitiesSnap.size });
            activitiesSnap.forEach((activity) => {
              this.firebaseService.addDocument("/plans/" + id + "/activities", { ...activity.data() })
            })
            firebase.firestore().collection("/users/" + this.user.uid + "/followers").get().then((followersSnap) => {
              followersSnap.forEach((follower) => {
                this.notificationService.newNotification(follower.data().uid, "Coach " + this.user.lname + " has added a new practice", this.user.photoUrl, "").then(() => {

                })
              })
            })
          }).then(() => {
            this.close()
          })

          firebase.firestore().collection("/templates/" + this.template + "/activities").get().then((activitiesSnap) => {
            this.firebaseService.updateDocument("/plans/" + id, { activities: activitiesSnap.size });
            activitiesSnap.forEach((activity) => {
              this.firebaseService.addDocument("/plans/" + id + "/activities", { ...activity.data() })
            })
            firebase.firestore().collection("/users/" + this.user.uid + "/followers").get().then((followersSnap) => {
              followersSnap.forEach((follower) => {
                this.notificationService.newNotification(follower.data().uid, "Coach " + this.user.lname + " has added a new practice", this.user.photoUrl, "").then(() => {

                })
              })
            })
          }).then(() => {
            this.close()
          })
        })
    }
  }

  getTemplates() {
    firebase.firestore().collection("/users/" + this.user.uid + "/templates/").get().then((templatesSnap) => {
      let templates = [];
      templatesSnap.forEach((template) => {
        templates.push(template.data())
      })
      this.templates = templates;
    })

    firebase.firestore().collection("/templates/")
      .where("sport", "==", this.user.sport)
      .get().then((templatesSnap) => {
        let templates = [];
        templatesSnap.forEach((template) => {
          templates.push(template.data())
        })
        this.sptemplates = templates;
      })
  }


  close() {
    this.helper.closeModal();
  }
}
