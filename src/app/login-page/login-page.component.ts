import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoginData} from '../interfaces/login-data.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {}

  login(loginData: LoginData): void {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/admin']))
      .catch((e) => console.log(e.message));
  }
}
