import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.page.html',
  styleUrls: ['./view-activity.page.scss'],
})
export class ViewActivityPage implements OnInit {

  constructor(
    private helper: HelperService,
  ) { }

  activity;
  ngOnInit() {
  }
  close() {
    this.helper.closeModal();
  }
}
