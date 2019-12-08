import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-drill',
  templateUrl: './edit-drill.page.html',
  styleUrls: ['./edit-drill.page.scss'],
})
export class EditDrillPage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
    private firebaseService: FirebaseService,
    private domSanitizer: DomSanitizer,
    private navCtrl: NavController,
  ) { }

  drill;
  user;
  videoPreview;
  trustedVideoUrl
  youtubeRegex = new RegExp('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$')
  validUrl
  ngOnInit() {
  }
  async ionViewWillEnter() {
    await this.getUser();
    this.checkUrl(this.drill.video)
  }

  async getUser() {
    this.user = await this.userService.getUser();
  }
  saveDrill() {
    if (this.drill.coach.uid) {
      this.drill.coach = this.drill.coach.uid;
    }

    this.firebaseService.updateDocument("/drills/" + this.drill.id, this.drill).then(() => {
      this.close();
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

  close() {
    this.helper.closeModal();
  }

  delete() {
    this.helper.confirmationAlert("Delete Drill", "Are you sure you want to delete this Drill?", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("/drills/" + this.drill.id).then(() => {
            this.close();
          })
        }
      })
  }
}
