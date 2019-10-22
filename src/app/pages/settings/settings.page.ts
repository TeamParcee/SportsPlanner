import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private helper: HelperService,
    private auth: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.helper.confirmationAlert("Sign Out", "Are you sure you want to Sign Out?", { denyText: "Cancel", confirmText: "Sign Out" })
      .then((result) => {
        if (result) {
          this.auth.signout().then(()=>{
            this.navCtrl.navigateBack("/login")
          })
        }
      })
  }
}
