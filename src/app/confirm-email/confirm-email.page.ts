import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';
import { AuthService } from '../services/auth.service';
import { AlertInput } from '@ionic/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private authService: AuthService,
    private navCtrl: NavController,
  ) { }

  user;
  emailInterval;
  ngOnInit() {
  }

  

  async getUser() {
    this.user = await this.userService.getUser();
    console.log(this.user);
  }


  getNewEmail() {
    let inputAlert: AlertInput[] = [{
      name: "email",
      placeholder: "New Email",
      type: "email"
    }]

    this.helper.inputAlert("Change Email", "Please enter your email address", inputAlert).then((result) => {
      console.log(result)
    })
  }
  changeEmail(email) {
    this.authService.changeEmail(email)
  }

  signout() {
    this.helper.confirmationAlert("Sign Out", "Are you sure you want to signout?", { denyText: "Cancel", confirmText: "Sign Out" })
      .then((result) => {
        if (result) {
          this.authService.signout().then(() => {
            this.navCtrl.navigateBack("/login")
          })
        }
      })
  }

  resendVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      this.helper.okAlert("Email Verification", "An email verification email has been sent to " + this.user.email)
    })
  }


  
}
