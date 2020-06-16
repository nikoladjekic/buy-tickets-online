import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleService } from 'src/services/google.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'ngApp';

  constructor(private _authService: AuthService, private _googleService: GoogleService, private _router: Router) {}

  ngOnInit() {
    this._authService.logoutUser();
    this._googleService.logoutGoogleUser();
  }

}
