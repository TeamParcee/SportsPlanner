import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-drill',
  templateUrl: './view-drill.page.html',
  styleUrls: ['./view-drill.page.scss'],
})
export class ViewDrillPage implements OnInit {

  constructor(
    private helper: HelperService,
    private domSanitizer: DomSanitizer,
  ) { }

  drill;
  trustedVideoUrl;

  ngOnInit() {
    this.getSafeUrl();
  }

  close() {
    this.helper.closeModal();
  }

  getSafeUrl() {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.drill.video);
  }

}
