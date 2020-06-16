import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private _loginWithGoogleUrl = "http://localhost:3000/auth/google";
  private _logoutGoogleUserUrl = "http://localhost:3000/auth/logout";

  constructor(private http: HttpClient, private _router: Router) { }

  loginWithGoogle() {
    return this.http.get<any>(this._loginWithGoogleUrl);
  }

  logoutGoogleUser() {
    return this.http.get(this._logoutGoogleUserUrl);
  }


}
