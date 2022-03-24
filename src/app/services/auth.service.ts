import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import {LoginData} from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login({email, password}: LoginData): any {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    return this.auth.signOut();
  }

}
