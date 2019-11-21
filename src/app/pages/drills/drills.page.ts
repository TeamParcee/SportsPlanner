import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from 'src/app/services/helper.service';
import { ViewDrillPage } from '../view-drill/view-drill.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EditDrillPage } from '../edit-drill/edit-drill.page';

@Component({
  selector: 'app-drills',
  templateUrl: './drills.page.html',
  styleUrls: ['./drills.page.scss'],
})
export class DrillsPage implements OnInit {

  constructor(
    private userService: UserService,
    private domSanitizer: DomSanitizer,
    private helper: HelperService,
    private firebaseService: FirebaseService,
  ) { }


  isHeadCoach;
  user;
  drills;
  filterDrills;
  drillView;
  showLoading = true;
  hideHeader = false;


  async ngOnInit() {
    await this.getUser();
    this.getDrillsIntialPrivate();
  }

  async ionViewWillEnter() {
    this.loadingTimeout();
    await this.getUser();
    await this.getDrillsPrivate();
    await this.checkIsHeadCoach();
  }
  async ionViewWillLeave() {
    this.showLoading = true;
  }

  loadingTimeout() {
    setTimeout(() => {
      this.showLoading = false;
    }, 1000)
  }
  async getDrillsPrivate() {
    this.drillView = "private";
    firebase.firestore().collection("/drills")
      .where("sport", "==", this.user.sport)
      .where("coach", "==", this.user.coach)
      .onSnapshot((drillsSnap) => {
        let drills = [];
        drillsSnap.forEach(async (drill) => {
          let d = { ...drill.data() }
          let coach = await this.getCoach(d.coach);
          d.coach = coach;
          drills.push(d)
        })
        this.drills = drills;
        this.filterDrills = drills;
      })
  }


  async getDrillsPublic() {
    this.drillView = "public";
    firebase.firestore().collection("/drills")
      .where("sport", "==", this.user.sport)
      .where("public", "==", true)
      .onSnapshot((drillsSnap) => {
        let drills = [];
        drillsSnap.forEach(async (drill) => {
          let d = { ...drill.data() }
          let coach = await this.getCoach(d.coach);
          d.coach = coach;
          drills.push(d)
        })
        this.drills = drills;
        this.filterDrills = drills;
      })
  }
  async getDrillsIntialPrivate() {
    firebase.firestore().collection("/drills")
      .where("sport", "==", this.user.sport)
      .where("coach", "==", this.user.coach)
      .get().then((drillsSnap) => {
        let drills = [];
        drillsSnap.forEach(async (drill) => {
          let d = { ...drill.data() }
          let coach = await this.getCoach(d.coach);
          d.coach = coach;
          drills.push(d)
        })
        this.drills = drills;
        this.filterDrills = drills;
      })
  }

  async getDrillsIntialPublic() {
    firebase.firestore().collection("/drills")
      .where("sport", "==", this.user.sport)
      .where("coach", "==", this.user.coach)
      .get().then((drillsSnap) => {
        let drills = [];
        drillsSnap.forEach(async (drill) => {
          let d = { ...drill.data() }
          let coach = await this.getCoach(d.coach);
          d.coach = coach;
          drills.push(d)
        })
        this.drills = drills;
        this.filterDrills = drills;
      })
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
    }
  }

  viewDrill(drill) {
    this.helper.openModal(ViewDrillPage, { drill: drill })
  }

  async getCoach(uid) {
    let coach = await this.firebaseService.getDocument("/users/" + uid);
    return coach;
  }


  editDrill(drill) {
    this.helper.openModal(EditDrillPage, { drill: drill })
  }

  onSearchChange(event) {
    let value = event.detail.value.toLowerCase();
    this.filterDrills = [];
    this.drills.forEach(item => {
      const shouldShow = item.name.toLowerCase().indexOf(value) > -1 ||
        item.coach.fname.toLowerCase().indexOf(value) > -1 ||
        item.coach.lname.toLowerCase().indexOf(value) > -1;
      if (shouldShow) {
        this.filterDrills.push(item)
      }
    });
  }

  getTrustedVideoUrl(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getThumbnail(id) {
    return "http://img.youtube.com/vi/" + id + "/0.jpg";

  }

  onHideHeader(event) {
    this.hideHeader = true;
    console.log(event)
  }
}
