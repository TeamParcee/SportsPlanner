import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private navCtrl: NavController,

  ) { }

  user;
  originalUser;

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();
  }
  async getUser() {
    this.user = await this.userService.getUser();
    this.originalUser = await this.userService.getUser();
  }

  saveFname() {
    this.firebaseService.updateDocument("/users/" + this.user.uid, { fname: this.user.fname });
    this.originalUser.fname = this.user.fname;
  }
  saveLname() {
    this.firebaseService.updateDocument("/users/" + this.user.uid, { lname: this.user.lname });
    this.originalUser.lname = this.user.lname;
  }
  saveEmail() {
    this.authService.changeEmail(this.user.email).then(() => {
      this.firebaseService.updateDocument("/users/" + this.user.uid, { email: this.user.email });
      this.navCtrl.navigateBack("/confirm-email")
    })
  }

  savePic() {
      this.firebaseService.updateDocument("/users/" + this.user.uid, { photoUrl: this.user.photoUrl });
      this.originalUser.photoUrl = this.user.photoUrl;
  }

  updatePic(event) {
    console.log(event)
  }

  readURL(input) {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (e:any) => {
        this.user.photoUrl = e.target.result;
      }
      reader.readAsDataURL(input.target.files[0]);
    }
  }
}
