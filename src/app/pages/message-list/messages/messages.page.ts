import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SelectContactPage } from 'src/app/pages/select-contact/select-contact.page';
import { MessagesService } from 'src/app/services/messages.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

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
  users = [];
  // messagesRef = "/users/" + this.firebaseService.user.uid + "/messageLists/";
  messages;
  user;

  ngOnInit() {
  }

  @ViewChildren('content') content: any;


  async getUser() {
    this.user = await this.userService.getUser();
  }
  async ionViewWillEnter() {
    await this.getUser();
    this.recipients = this.messageService.recipients;
    this.getMessageId();
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
      id: this.messageId,
      created: new Date().toUTCString(),
      recipients: this.recipients,
      lastMessage: this.text,

    };

    let recipientMessageList = {
      id: this.messageId,
      created: new Date().toUTCString(),
      recipients: [this.user],
      lastMessage: this.text,
      new: true,
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
        createdRaw: new Date(),
        new: true,
        text: this.text,
        createdby: this.user.uid,
      }, this.recipients)
      this.text = "";
    })
  }


  getMessageId() {
    this.messageService.getMessageId(this.messageService.getRecipientsUids(this.recipients)).then((id) => {
      this.messageId = id;
      this.getMessages();
      this.getChatUsers();
    })

  }

  async getMessages() {

    this.messages = [];
    await firebase.firestore().collection("/users/" + this.user.uid + "/messageLists/" + this.messageId + "/messages/")
      .orderBy("createdRaw")
      .onSnapshot((messagesSnap) => {

        let messages = [];
        messagesSnap.forEach(async (message: any) => {
          // let user = await this.getCreater(message.data().createdby);
          let m = { ...message.data() }
          // m.user = user;
          messages.push(m)
        })
        this.messages = messages;
      })
  }

  async getCreater(uid) {
    return await this.userService.getUserFromUid(uid);
  }


  getContent() {
    let x = document.querySelector('ion-content');
    return x;
  }

  getChatUsers() {
    firebase.firestore().doc("/users/" + this.user.uid + "/messageLists/" + this.messageId)
      .get().then((messageListSnap) => {
        if (messageListSnap.exists) {
          let recipients = [...messageListSnap.data().recipients];
          recipients.push(this.user);
          recipients.forEach(async (recipient) => {
            let user = await this.userService.getUserFromUid(recipient.uid);
            this.users.push(user)
          })
        }
      })
  }

  getMessageSender(uid) {
    let index = this.users.findIndex(u => u.uid == uid);
    return this.users[index]
  }
}
