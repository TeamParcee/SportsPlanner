import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SelectContactPage } from 'src/app/pages/select-contact/select-contact.page';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private helper: HelperService,
    private messageService: MessagesService,
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) { }

  recipients;
  text;
  messageId;
  // messagesRef = "/users/" + this.firebaseService.user.uid + "/messageLists/";
  messages;
  user;
  ngOnInit() {
    this.scrollToBottom();
  }

  @ViewChildren('content') private content: any;

  async getUser() {
    this.user = await this.userService.getUser();
  }
  async ionViewWillEnter() {
    await this.getUser();
    this.recipients = this.messageService.recipients;
    this.getMessageId();
    this.scrollToBottom();
  }
  ionViewWillLeave() {
    this.recipients = this.messageService.recipients = [];
  }
  close() {
    this.helper.closeModal();
  }
  viewContacts() {
    this.helper.openModalPromise(SelectContactPage, null).then(() => {
      this.getMessageId();
      this.recipients = this.messageService.recipients;
    })
  }
  removeUser(user) {
    this.messageService.removeUserAsRecipient(user);
    this.getMessageId();
  }

  checkIfMultipleRecipients(recipients) {
    if (recipients.length > 1) {
      return recipients[0].fname + " & " + (recipients.length - 1) + " more"
    } else {
      return recipients[0].fname + " " + recipients[0].lname;
    }
  }

  async createMessageList() {
    let messageList = {
      created: new Date().toUTCString(),
      recipients: this.recipients,
      lastMessage: this.text,
    };

    let recipientMessageList = {
      created: new Date().toUTCString(),
      recipients: [this.user],
      lastMessage: this.text,
    };
    return new Promise((resolve) => {
      this.messageService.createMessageList(this.user, this.messageId, messageList, recipientMessageList).then(() => {
        return resolve()
      })
    })
  }
  sendMessage() {
    this.createMessageList().then(() => {
      this.messageService.sendMesage(this.messageId, {
        created: new Date().toUTCString(),
        new: true,
        text: this.text,
        createdby: this.user.uid,
      }, this.recipients)
      this.scrollToBottom();
      this.text = "";
    })
  }


  getMessageId() {
    this.messageService.getMessageId(this.messageService.getRecipientsUids(this.recipients)).then((id) => {
      this.messageId = id;
      this.getMessages();
    })

  }

  async getMessages() {

    this.messages = [];
    await firebase.firestore().collection("/users/" + this.user.uid + "/messageLists/" + this.messageId + "/messages/")
      .orderBy("created")
      .onSnapshot((messagesSnap) => {
        if (messagesSnap.empty) {
          this.messages = [];

        } else {
          let messages = [];
          messagesSnap.forEach(async (message: any) => {
            let user = await this.getCreater(message);
            message.user = user;
            messages.push(message.data())
          })
          this.messages = messages;
        }

      })
  }

  async getCreater(uid) {
    return await this.userService.getUserFromUid(uid);
  }


   getContent() {
    return document.querySelector('ion-content');
  }
   scrollToBottom() {
    this.getContent().scrollToBottom(500);
  }
}
