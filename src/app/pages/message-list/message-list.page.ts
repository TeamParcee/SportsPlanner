import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as firebase from 'firebase';
import { HelperService } from '../../services/helper.service';
import { MessagesService } from 'src/app/services/messages.service';
import { MessagesPage } from './messages/messages.page';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private messagesService: MessagesService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  user;
  messageLists;
  newMessages;

  async ionViewWillEnter() {
    await this.getUser();
    this.getMessageList();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  getMessageList() {
    firebase.firestore().collection("/users/" + this.user.uid + "/messageLists").onSnapshot((messageListsSnap) => {
      let messageLists = [];
      messageListsSnap.forEach((messageList) => {
        let recipientsUids: any = this.messagesService.getRecipientsUids(messageList.data().recipients);
        let recipients = [];
        recipientsUids.forEach(async (recipient) => {
          let user = await this.getUserFromUid(recipient);
          recipients.push(user);
        })
        let newMessageList: any = messageList.data();
        newMessageList.recipients = recipients;
        newMessageList.created = newMessageList.created.toString();
        messageLists.push(newMessageList);
      })
      this.messageLists = messageLists;
    })
  }
  viewMessages(recipients, messageList) {
    this.firebaseService.updateDocument("users/" + this.user.uid + "/messageLists/" + messageList.id, { new: false })
    this.helper.openModal(MessagesPage, null);
    this.messagesService.recipients = [...recipients];
  }

  newMessage() {
    this.helper.openModalPromise(MessagesPage, null)
  }
  async getUserFromUid(uid) {
    let user: any = await this.userService.getUserFromUid(uid);
    return user;
  }

  getRecipientName(messageList: []) {
    let names = []
    messageList.forEach((x: any) => {
      names.push(x.fname + " " + x.lname);
    })

    return names.sort().toString().replace(",", " & ");

  }

}
