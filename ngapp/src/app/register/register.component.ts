import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GoogleService } from 'src/services/google.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerUserData = {};
  userExists: boolean = false;

  constructor(
    private _auth: AuthService, 
    private _router: Router, 
    private _googleService: GoogleService) {}

  ngOnInit() { }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        this.userExists = false;
        localStorage.setItem('token', res.token)
        this._router.navigate(['/special'])
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.userExists = true
          }
        }
      }
    )
  }

  googleLogin() {
    this._googleService.loginWithGoogle().subscribe( user => {
      console.log(user);
    })
  }
  

}
