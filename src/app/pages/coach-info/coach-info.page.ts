import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.page.html',
  styleUrls: ['./coach-info.page.scss'],
})
export class CoachInfoPage implements OnInit {

  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser()
  }

  password;
  sport;
  user;


  async getUser() {
    this.user = await this.userService.getUser();
    
  }
  saveCoachInfo() {

    this.firebaseService.updateDocument("/users/" + this.user.uid, { coachPassword: this.password, sport: this.sport })
      .then(() => {
        this.router.navigateByUrl("/tabs/plans")
      })
  }
}
