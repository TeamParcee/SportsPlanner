import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { TemplatePage } from '../template/template.page';

@Component({
  selector: 'app-sports-planner-templates',
  templateUrl: './sports-planner-templates.page.html',
  styleUrls: ['./sports-planner-templates.page.scss'],
})
export class SportsPlannerTemplatesPage implements OnInit {
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
    firebase.firestore().collection("templates")
      .where("sport", "==", this.user.sport)
      .get().then((templatesSnap) => {
        let templates = [];
        templatesSnap.forEach((template) => {
          templates.push(template.data());
        })
        this.templates = templates;
      })
  }
  viewTemplate(template) {
    this.helper.openModalPromise(TemplatePage, { plan: template, sportsPlannerTemplates: true}).then(() => {
      this.getTemplates();
    })
  }

  delete(template) {
    this.helper.confirmationAlert("Delete Template", "Are you sure you want to delete this admin template " + template.name + "?", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("/templates/" + template.id);
          this.getTemplates()
        }
      })
  }
}
