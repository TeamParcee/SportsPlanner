import { Component, OnInit } from '@angular/core';
import { DrillsService } from 'src/app/services/drills.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { ViewDrillPage } from '../../view-drill/view-drill.page';
import { EditDrillPage } from '../../edit-drill/edit-drill.page';
import { DomSanitizer } from '@angular/platform-browser';
import * as firebase from 'firebase';

@Component({
  selector: 'app-private-drills',
  templateUrl: './private-drills.component.html',
  styleUrls: ['./private-drills.component.scss'],
})
export class PrivateDrillsComponent implements OnInit {

  constructor(
    private drillService: DrillsService,
    private userService: UserService,
    private helper: HelperService,
    private domSanitizer: DomSanitizer,
  ) { }


  showLoading = true;
  drills;
  user;
  isHeadCoach;
  noDrills;

  async ngOnInit() {
    this.loadingTimeout();
    await this.getUser();
    await this.checkIsHeadCoach();
    this.getDrills();
  }


  async ionViewWillEnter() {


  }


  async getUser() {
    this.user = await this.userService.getUser();
  }

  loadingTimeout() {
    setTimeout(() => {
      this.showLoading = false;
    }, 1000)
  }

  async getDrills() {
    this.drills = await this.drillService.getPrivateDrills(this.user);
    if (this.drills.length == 0) {
      this.noDrills = false;
    }
  }


  checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
      console.log(this.isHeadCoach)
    }
  }

  viewDrill(drill) {
    this.helper.openModal(ViewDrillPage, { drill: drill })
  }




  editDrill(drill) {
    this.helper.openModalPromise(EditDrillPage, { drill: drill }).then(() => {
      this.getDrills()
    })
  }



  getTrustedVideoUrl(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getThumbnail(id) {
    return "http://img.youtube.com/vi/" + id + "/0.jpg";

  }




  getPrivateVideos(event) {
    if (this.drillService.lastPrivateVisible) {
      setTimeout(() => {
        firebase.firestore().collection("/drills")
          .limit(5)
          .orderBy("name")
          .startAfter(this.drillService.lastPrivateVisible)
          .where("coach", "==", this.user.coach)
          .get().then((drillsSnap) => {
            this.drillService.lastPrivateVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
            drillsSnap.forEach(async (drill) => {
              let d = { ...drill.data() }
              let coach = await this.drillService.getCoach(d.coach);
              d.coach = coach;
              this.drills.push(d)
            })
          })

        event.target.complete();
      }, 1000)
    }
    else {
      event.target.complete();
    }
  }

}