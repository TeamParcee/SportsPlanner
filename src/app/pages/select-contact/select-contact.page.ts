import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MessageService } from '../../services/message.service';
import { HelperService } from '../../services/helper.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.page.html',
  styleUrls: ['./select-contact.page.scss'],
})
export class SelectContactPage implements OnInit {

  constructor(
    private helper: HelperService,
    private messageService: MessagesService,
    private userService: UserService,
  ) { }

  users;
  user;
  recipients;
  noOtherUsers = false;

  ngOnInit() {
  }



  async ionViewWillEnter() {
    await this.getUser();
    await this.getUsers();
    this.recipients = this.messageService.recipients;
    await console.log(this.users.length, this.recipients.length)

  }

  async getUser() {
    this.user = await this.userService.getUser();
  }
  close() {
    this.helper.closeModal()
  }
  async getUsers() {

    return new Promise((resolve) => {
      firebase.firestore().collection("users")
        .where("coach", "==", this.user.coach)
        .onSnapshot((userSnap) => {
          let users = [];
          userSnap.forEach((user) => {
            if (!this.checkIfUserAlreadySelected(user.data())) {
              users.push(user.data())
            }
          })
          this.users = users;
          if (this.users == 0) [
            this.noOtherUsers = true,
          ]
          return resolve()
        })
    })

  }

  selectContact(user) {
    this.messageService.recipients.push(user);
    this.helper.closeModal();
  }

  checkIfUserAlreadySelected(user) {
    if (user.uid == this.user.uid) {
      return true;
    }
    let index = this.messageService.recipients.findIndex(u => u.uid == user.uid);
    return (index > -1) ? true : false;
  }


}
