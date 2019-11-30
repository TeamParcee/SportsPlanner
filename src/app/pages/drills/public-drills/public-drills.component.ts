import { Component, OnInit } from '@angular/core';
import { DrillsService } from 'src/app/services/drills.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewDrillPage } from '../../view-drill/view-drill.page';
import { EditDrillPage } from '../../edit-drill/edit-drill.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-public-drills',
  templateUrl: './public-drills.component.html',
  styleUrls: ['./public-drills.component.scss'],
})
export class PublicDrillsComponent implements OnInit {

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
    this.drills = await this.drillService.getDrillsPublic(this.user);
    if (this.drills.length == 0) {
      this.noDrills = false;
      console.log(this.drills, this.drills.length)
      console.log("no drills");
    } else {
      console.log(this.drills.length, "dsafsafasdfsa")
    }
  }


  checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
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




  getPublicVideos(event) {
    if (this.drillService.lastPublicVisible) {
      setTimeout(() => {
        firebase.firestore().collection("/drills")
          .limit(5)
          .orderBy("name")
          .startAfter(this.drillService.lastPublicVisible)
          .where("sport", "==", this.user.sport)
          .where("public", "==", true)
          .get().then((drillsSnap) => {
            this.drillService.lastPublicVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
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