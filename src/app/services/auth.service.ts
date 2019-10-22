import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private helper: HelperService,
    private navCtrl: NavController,
  ) { }


  createUserWitEmail(email, password) {
    return new Promise((resolve) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        return resolve(result.user)
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }

  loginUserWithEmail(email, password) {
    return new Promise((resolve,) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error);
      })
    })
  }
  signout() {
    return new Promise((resolve) => {
      firebase.auth().signOut().then(() => {
        return resolve()
      })
    })
  }

  sendConfirmationEmail() {
    return new Promise((resolve) => {
      firebase.auth().currentUser.sendEmailVerification().then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }


  changeEmail(newEmail) {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updateEmail(newEmail).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }

  resetPassword(email) {
    return new Promise((resolve) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }

  displayError(error) {
    this.helper.okAlert("There was a problem", error.message)
  }

}
