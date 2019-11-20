import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-view-drill',
  templateUrl: './view-drill.page.html',
  styleUrls: ['./view-drill.page.scss'],
})
export class ViewDrillPage implements OnInit {

  constructor(
    private helper: HelperService,
    private domSanitizer: DomSanitizer,
    private statusBar: StatusBar
  ) { }

  drill;
  trustedVideoUrl;

  ngOnInit() {
    this.getSafeUrl();
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }
  close() {
    this.helper.closeModal();
  }

  getSafeUrl() {
    let autoplayUrl = this.drill.video + "?autoplay=1";
    console.log(autoplayUrl);
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(autoplayUrl);
    console.log(this.trustedVideoUrl)
  }
  logScrollStart(event) {
  }
}
