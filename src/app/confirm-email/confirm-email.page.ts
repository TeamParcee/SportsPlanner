import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {

  constructor(
    private userService: UserService,

  ) { }

  user;
  ngOnInit() {
  }

  async getUser(){
    this.user = await this.userService.getUser();
    console.log(this.user);
  }
}
