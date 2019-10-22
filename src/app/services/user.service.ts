import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { FirebaseService } from './firebase.service';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
  ) {
    this.getUser();
  }



  firebaseUser;


  getUser = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        this.firebaseUser = firebaseUser;
        let user = await this.firebaseService.getDocument("/users/" + firebaseUser.uid);
        return resolve(user)
      })

    })

  }


  updateProfile(photoURL, displayName) {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updateProfile({
        photoURL: photoURL,
        displayName: displayName
      }).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }

 


  createUserData(name, photoURL, uid, email) {
    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + this.firebaseUser.uid, {
        name: name,
        photoURL: photoURL,
        uid: uid,
        email: email
      }).then(() => {
        return resolve()
      })
    })

  }
  

  getUserFromUid(uid) {
    return new Promise((resolve) => {
      return firebase.firestore().doc("/users/" + uid).get().then((userSnap) => {
        return resolve(userSnap.data())
      })
    })
  }
  displayError(error) {
    this.helper.okAlert("There was a problem", error.message)
  }


}
