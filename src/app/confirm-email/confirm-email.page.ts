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
  authInterval;
  ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.getUser();
    await this.resendVerification();
    await this.checkEmailConfirmed();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  async ionViewWillLeave() {
    clearInterval(this.authInterval)
  }

  getNewEmail() {
    let inputAlert: AlertInput[] = [{
      name: "email",
      placeholder: "New Email",
      type: "email"
    }]

    this.helper.inputAlert("Change Email", "Please enter your email address", inputAlert).then((result: any) => {
      this.changeEmail(result.email)
    })
  }
  changeEmail(email) {
    firebase.auth().currentUser.updateEmail(email).then(() => {
      this.authService.changeEmail(email).then(() => {
        this.resendVerification();
        this.user.email = email;
      })
    })

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


  checkEmailConfirmed() {
    this.authInterval = setInterval(() => {
      firebase.auth().currentUser.reload();
      if (firebase.auth().currentUser.emailVerified) {
        clearInterval(this.authInterval);
        this.navCtrl.navigateForward("/tabs/plan")
      }
    }, 1000)



  }
}
