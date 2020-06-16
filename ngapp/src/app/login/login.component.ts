import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginUserData = {};
  wrongEmail: boolean = false;
  wrongPass: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {  }

  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/special'])
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            if (err.error === 'Invalid email') return this.wrongEmail = true
            else return (
              this.wrongEmail = false,
              this.wrongPass = true
            )
          }
        }
      }
    )
  }

}
