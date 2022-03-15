// @ts-ignore
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login({email, password}: LoginData): any {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

}

export interface LoginData {
  email: string;
  password: string;
}
