import { Directive, Input, HostListener } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { ViewProfilePage } from '../pages/view-profile/view-profile.page';

@Directive({
  selector: '[appViewProfile]'
})
export class ViewProfileDirective {

  constructor(
    private helper: HelperService,
  ) { }


  @Input() user;

  viewProfile() {
    this.helper.openModal(ViewProfilePage, { user: this.user, })
  }


  @HostListener('click') onClick() {
    this.viewProfile()
  }
}
