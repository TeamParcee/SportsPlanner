import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  email;
  password;

  login() {
    this.auth.loginUserWithEmail(this.email, this.password).then(() => {
      this.router.navigateByUrl("/tabs/plan");
    })
  }
}
