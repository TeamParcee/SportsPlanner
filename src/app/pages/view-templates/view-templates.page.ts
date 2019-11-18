import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { NavController, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { TemplatePage } from '../template/template.page';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-templates',
  templateUrl: './view-templates.page.html',
  styleUrls: ['./view-templates.page.scss'],
})
export class ViewTemplatesPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
  ) { }

  templates;
  user;


  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();
    await this.getTemplates()
  }
  async getUser() {
    this.user = await this.userService.getUser()
  }
  getTemplates() {
    firebase.firestore().collection("/users/" + this.user.uid + "/templates/").get().then((templatesSnap) => {
      let templates = [];
      templatesSnap.forEach((template) => {
        templates.push(template.data())
      })
      this.templates = templates;
    })
  }
  viewTemplate(template) {
    this.helper.openModalPromise(TemplatePage, { plan: template }).then(() => {
      this.getTemplates();
    })
  }

  delete(template) {
    this.helper.confirmationAlert("Delete Template", "Are you sure you want to delete template " + template.name + "?", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("/users/" + this.user.uid + "/templates/" + template.id);
          this.getTemplates()
        }
      })
  }
}
