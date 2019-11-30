import { Directive, Input, HostListener } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { ViewProfilePage } from '../pages/view-profile/view-profile.page';
import { Router } from '@angular/router';

@Directive({
  selector: '[appViewProfile]'
})
export class ViewProfileDirective {

  constructor(
    private helper: HelperService,
    private router: Router,
  ) { }


  @Input() user;

  viewProfile() {
    this.router.navigateByUrl("/view-profile/" + this.user.uid)
  }


  @HostListener('click') onClick() {
    this.viewProfile()
  }
}
