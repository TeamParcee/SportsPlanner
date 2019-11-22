import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DrillsService {

  constructor(
    private firebaseService: FirebaseService,
  ) { }


  drills;
  lastPrivateVisible: any = 1;
  lastPublicVisible: any = 1;

  getPrivateDrills(user) {
    return new Promise((resolve) => {
      firebase.firestore().collection("/drills")
        .limit(5)
        .where("coach", "==", user.coach)
        .orderBy("name")
        .onSnapshot((drillsSnap) => {
          this.lastPrivateVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
          let drills = [];
          drillsSnap.forEach(async (drill) => {
            let d = { ...drill.data() }
            let coach = await this.getCoach(d.coach);
            d.coach = coach;
            drills.push(d)
          })
          return resolve(drills)
        })
    })

  }

  async getDrillsPublic(user) {
    return new Promise((resolve) => {
      firebase.firestore().collection("/drills")
        .limit(5)
        .orderBy("name")
        .where("sport", "==", user.sport)
        .where("public", "==", true)
        .onSnapshot((drillsSnap) => {
          this.lastPublicVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
          let drills = [];
          drillsSnap.forEach(async (drill) => {
            let d = { ...drill.data() }
            let coach = await this.getCoach(d.coach);
            d.coach = coach;
            drills.push(d)
          })
          return resolve(drills);
        })

    })
  }


  async getCoach(uid) {
    let coach = await this.firebaseService.getDocument("/users/" + uid);
    return coach;
  }


  // async getDrillsIntialPrivate(user) {

  //   return new Promise((resolve) => {
  //     firebase.firestore().collection("/drills")
  //       .limit(1)
  //       .orderBy("name")
  //       .where("sport", "==", user.sport)
  //       .where("coach", "==", user.coach)
  //       .get().then((drillsSnap) => {
  //         this.lastVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
  //         let drills = [];
  //         drillsSnap.forEach(async (drill) => {
  //           let d = { ...drill.data() }
  //           let coach = await this.getCoach(d.coach);
  //           d.coach = coach;
  //           drills.push(d)
  //         })
  //         return resolve(drills);
  //       })
  //   })

  // }

  // async getDrillsIntialPublic(user) {
  //   firebase.firestore().collection("/drills")
  //     .limit(1)
  //     .orderBy("name")
  //     .where("sport", "==", user.sport)
  //     .get().then((drillsSnap) => {
  //       this.lastVisible = drillsSnap.docs[drillsSnap.docs.length - 1];
  //       let drills = [];
  //       drillsSnap.forEach(async (drill) => {
  //         let d = { ...drill.data() }
  //         let coach = await this.getCoach(d.coach);
  //         d.coach = coach;
  //         drills.push(d)
  //       })
  //       this.drills = drills;
  //     })
  // }




}
