import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-swipe-down-close',
  templateUrl: './swipe-down-close.component.html',
  styleUrls: ['./swipe-down-close.component.scss'],
})
export class SwipeDownCloseComponent implements OnInit {

  constructor(
    private helper: HelperService,
  ) { }

  @Input() backPageTitle;
  
  ngOnInit() { }

  close() {
    this.helper.closeModal()
  }

}
