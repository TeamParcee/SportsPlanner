import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { ViewDrillPage } from '../view-drill/view-drill.page';

@Component({
  selector: 'app-add-drill',
  templateUrl: './add-drill.page.html',
  styleUrls: ['./add-drill.page.scss'],
})
export class AddDrillPage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
    private firebaseService: FirebaseService,
    private domSanitizer: DomSanitizer,
    private navCtrl: NavController,
  ) { }

  drill: { coach?, video?, sport?, youtubeId?, plansCount?, photoUrl?, fname?, lname?} = {};
  user;
  videoPreview;
  trustedVideoUrl
  youtubeRegex = new RegExp('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$')
  validUrl
  ngOnInit() {
  }
  async ionViewWillEnter() {
    await this.getUser();
  }

  async getUser() {
    this.user = await this.userService.getUser();
  }
  addDrill() {
    this.drill.coach = this.user.coach;
    this.drill.sport = this.user.sport;
    this.drill.photoUrl = this.user.photoUrl;
    this.drill.fname = this.user.fname;
    this.drill.lname = this.user.lname;
    this.drill.plansCount = 0;
    this.firebaseService.addDocument("/drills", this.drill).then(() => {
      this.navCtrl.navigateBack("/tabs/drills")
    })
  }

  getSafeUrl(url) {

    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkUrl(url) {
    this.validUrl = this.youtubeRegex.test(url);
    if (this.validUrl) {
      let videoId = this.getYouTubeGetID(url);
      let videoUrl = "https://www.youtube.com/embed/" + videoId;
      this.drill.video = videoUrl;
      this.drill.youtubeId = videoId;
      this.getSafeUrl(videoUrl)
    } else {
      this.trustedVideoUrl = ""
    }
  }

  getYouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
  }

}
