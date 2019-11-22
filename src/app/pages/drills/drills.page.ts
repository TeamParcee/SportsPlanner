import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from 'src/app/services/helper.service';
import { ViewDrillPage } from '../view-drill/view-drill.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EditDrillPage } from '../edit-drill/edit-drill.page';
import { DrillsService } from 'src/app/services/drills.service';

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
    private drillService: DrillsService,
  ) { }


  isHeadCoach;
  user;
  privateDrills;
  publicDrills;
  drillView;
  showLoading = true;
  hideHeader = false;
  query;

  async ngOnInit() {
    this.drillView = "private"
  }


  async ionViewWillEnter() {
    await this.getUser();
    await this.checkIsHeadCoach()
  }

  async getUser() {
    this.user = await this.userService.getUser();
  }

  async checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
    }
  }


  async getDrillsPrivate() {
    this.drillView = "private";

  }


  async getDrillsPublic() {
    this.drillView = "public";
  }

  // async ionViewWillEnter() {
  //   this.loadingTimeout();
  //   await this.getUser();

  //   await this.checkIsHeadCoach();

  // }

  // loadingTimeout() {
  //   setTimeout(() => {
  //     this.showLoading = false;
  //   }, 1000)
  // }

  // async getDrillsPrivate() {
  //   this.drillView = "private";
  //   this.privateDrills = await this.drillService.getPrivateDrills(this.user);

  // }


  // async getDrillsPublic() {
  //   this.drillView = "public";
  //   this.publicDrills = await this.drillService.getDrillsPublic(this.user)
  // }




  // viewDrill(drill) {
  //   this.helper.openModal(ViewDrillPage, { drill: drill })
  // }




  // editDrill(drill) {
  //   this.helper.openModal(EditDrillPage, { drill: drill })
  // }



  // getTrustedVideoUrl(url) {
  //   return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  // getThumbnail(id) {
  //   return "http://img.youtube.com/vi/" + id + "/0.jpg";

  // }

  // onHideHeader(event) {
  //   this.hideHeader = true;
  // }

  // loadData(event) {
  //   if (this.drillView = "public") {
  //     this.getPublicVideos(event)
  //   }
  //   if (this.drillView = "private") {
  //     this.getPrivateVideos(event)
  //   }
  // }

  // getPrivateVideos(event) {
  //   if (this.drillService.lastPrivateVisible) {
  //     setTimeout(() => {
  //       firebase.firestore().collection("/drills")
  //         .limit(1)
  //         .orderBy("name")
  //         .startAfter(this.drillService.lastPrivateVisible)
  //         .where("sport", "==", this.user.sport)
  //         .where("coach", "==", this.user.coach)
  //         .get().then((drillsSnap) => {
  //           this.drillService.lastPrivateVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
  //           drillsSnap.forEach(async (drill) => {
  //             let d = { ...drill.data() }
  //             let coach = await this.drillService.getCoach(d.coach);
  //             d.coach = coach;
  //             this.privateDrills.push(d)
  //           })
  //         })

  //       event.target.complete();
  //     }, 1000)
  //   }
  //   else {
  //     event.target.complete();
  //   }
  // }

  // getPublicVideos(event) {
  //   if (this.drillService.lastPublicVisible) {
  //     setTimeout(() => {
  //       firebase.firestore().collection("/drills")
  //         .limit(1)
  //         .orderBy("name")
  //         .startAfter(this.drillService.lastPrivateVisible)
  //         .where("sport", "==", this.user.sport)
  //         .get().then((drillsSnap) => {
  //           this.drillService.lastPrivateVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
  //           drillsSnap.forEach(async (drill) => {
  //             let d = { ...drill.data() }
  //             let coach = await this.drillService.getCoach(d.coach);
  //             d.coach = coach;
  //             this.privateDrills.push(d)
  //           })
  //         })

  //       event.target.complete();
  //     }, 1000)
  //   }
  //   else {
  //     event.target.complete();
  //   }
  // }

}
