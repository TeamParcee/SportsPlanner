import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { DrillsService } from 'src/app/services/drills.service';
import { ViewDrillPage } from '../view-drill/view-drill.page';
import { EditDrillPage } from '../edit-drill/edit-drill.page';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-search-drills',
  templateUrl: './search-drills.page.html',
  styleUrls: ['./search-drills.page.scss'],
})
export class SearchDrillsPage implements OnInit {

  constructor(
    private userService: UserService,
    private drillService: DrillsService,
    private helper: HelperService,

  ) { }

  ngOnInit() {
  }

  drills = [];
  filterDrills;
  user;
  showLoading;
  noDrills;
  isHeadCoach;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoachDrills();
    await this.getPublicDrills();
  }

  async ionViewWillLeave() {
    this.filterDrills = [];
  }

  async getUser() {
    this.user = await this.userService.getUser();
  }


  loadingTimeout() {
    this.showLoading = true;
    this.noDrills = false;
    setTimeout(() => {
      this.showLoading = false;
    }, 1000)
  }

  getPublicDrills() {
    firebase.firestore().collection('drills')
      .where("public", "==", true)
      .where("sport", "==", this.user.sport)
      .onSnapshot((drillsSnap) => {
        drillsSnap.forEach(async (drill) => {
          let d = { ...drill.data() }
          let coach = await this.drillService.getCoach(d.coach);
          d.coach = coach;
          this.drills.push(d)
        })

      })
  }

  getCoachDrills() {
    firebase.firestore().collection('drills')
      .where("public", "==", false)
      .where("sport", "==", this.user.sport)
      .where("coach", "==", this.user.coach)
      .onSnapshot((drillsSnap) => {

        drillsSnap.forEach(async (drill) => {
          let d = { ...drill.data() }
          let coach = await this.drillService.getCoach(d.coach);
          d.coach = coach;
          this.drills.push(d)
        })

      })
  }

  onSearchChange(event) {
    this.loadingTimeout();
    setTimeout(() => {
      if (this.filterDrills.length == 0) {
        this.noDrills = true;
      } else {
        this.noDrills = false;
      }
    }, 1000);

    let value = event.detail.value.toLowerCase();
    if (!value) {
      this.filterDrills = [];
      return
    }
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
  getThumbnail(id) {
    return "http://img.youtube.com/vi/" + id + "/0.jpg";
  }


  viewDrill(drill) {
    this.helper.openModal(ViewDrillPage, { drill: drill })
  }
}
