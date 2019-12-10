import { Component, OnInit, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { EditActivityPage } from '../edit-activity/edit-activity.page';
import { AddToPlanPage } from '../add-to-plan/add-to-plan.page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.page.html',
  styleUrls: ['./view-activity.page.scss'],
})
export class ViewActivityPage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private _element: ElementRef,
  ) { }

  activity;
  user;
  isHeadCoach;
  activityType;
  hideEdit = false;
  publicDrill;
  _link;

  ngOnInit() {
  }
  async ionViewWillEnter() {
    await this.getUser();
    await this.checkIsHeadCoach();
    await this._enableDynamicHyperlinks();
    this.showEditActivity();
  }

  close() {
    this.helper.closeModal();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  checkIsHeadCoach() {
    if (this.user.coach == this.user.uid) {
      this.isHeadCoach = true;
    } else {
      this.isHeadCoach = false
    }
  }
  editActivity() {
    this.helper.closeModal();
    this.helper.openModal(EditActivityPage, { activity: this.activity, activityType: this.activityType })
  }

  showEditActivity() {
    if (this.activityType == "adminTemplate") {
      if (!this.user.admin) {
        this.hideEdit = true;
      }

    }

    if (this.publicDrill) {
      this.hideEdit = true
    }
  }

  addToPlan() {
    this.helper.openModal(AddToPlanPage, { activity: this.activity })
  }

 


  private _enableDynamicHyperlinks(): void {
    // Provide a minor delay to allow the HTML to be rendered and 'found'
    // within the view template
    setTimeout(() => {
      // Query the DOM to find ALL occurrences of the <a> hyperlink tag
      const urls: any = this._element.nativeElement.querySelectorAll('a');
      // Iterate through these
      urls.forEach((url) => {
        // Listen for a click event on each hyperlink found
        url.addEventListener('click', (event) => {
          // Retrieve the href value from the selected hyperlink
          event.preventDefault();
          this._link = event.target.href;

          console.log('Name is: ' + event.target.innerText);
          console.log('Link is: ' + this._link);
          window.open(this._link, '_system')
        }, false);
      });
    }, 2000);
  }

}
