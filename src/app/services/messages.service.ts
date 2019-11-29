import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) { }


  recipients = [];



  createMessageList(user, messageListId, messageList, recipientMessageList) {
    return new Promise(async (resolve) => {
      this.firebaseService.setDocument("/users/" + user.uid + "/messageLists/" + messageListId, messageList);
      messageList.recipients.forEach((recipient: any) => {
        this.firebaseService.setDocument("/users/" + recipient.uid + "/messageLists/" + messageListId, recipientMessageList)
        return resolve()
      })
    })
  }

  sendMesage(messageListId, message, recipients: []) {
    return new Promise(async (resolve) => {
      let user: any = await this.userService.getUser();
      this.firebaseService.addDocument("/users/" + user.uid + "/messageLists/" + messageListId + "/messages", message)
        .then(() => {
          recipients.forEach((recipient: any) => {
            this.firebaseService.addDocument("/users/" + recipient.uid + "/messageLists/" + messageListId + "/messages", message)
          })
          return resolve()
        })
    })
  }

  deleteMessage(messageListId, messageId) {
    return new Promise(async (resolve) => {
      let user: any = await this.userService.getUser();
      this.firebaseService.deleteDocument("/users/" + user.uid + "/messageLists/" + messageListId + "/messages" + messageId)
        .then(() => {
          return resolve()
        })
    })
  }

  removeUserAsRecipient(user) {
    let index = this.recipients.findIndex(u => user.uid == u.uid);
    this.recipients.splice(index, 1);
  }

  async getMessageId(recipientsUids: any[]) {
    let user: any = await this.userService.getUser();
    let newId = firebase.firestore().collection("users/" + user.uid + "/messageLists").doc().id;
    let chatFound = false;

    return new Promise(async (resolve) => {
      return firebase.firestore().collection("users/" + user.uid + "/messageLists").get().then((messageListsSnap) => {

        if (!messageListsSnap.docs.length) {
          return resolve(newId);
        }
        for (let index = 0; index < messageListsSnap.size; index++) {
          const element = messageListsSnap.docs[index];
          let data = element.data();
          let previousRecipientsUids = this.getRecipientsUids(data.recipients).sort().toString();
          let alreadyStratedAChat = recipientsUids.sort().toString() == previousRecipientsUids;
          if (alreadyStratedAChat) {
            chatFound = true;
            return resolve(element.id);
          }
        }
        return resolve(newId);
      })
    })
  }

  getRecipientsUids(recipientsUids): any[] {
    let recipients = [];
    recipientsUids.forEach((recipient) => {
      recipients.push(recipient.uid)
    })
    return recipients;
  }
}
