import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'od-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginValid = false;
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  hide = true;

  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(private _auth: AuthService, private _route: ActivatedRoute) {
    this.returnUrl =
      this._route.snapshot.queryParams['returnUrl'] || '/navigation/home';
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    this._auth.loginWithEmailAndPassword(
      this.username.value,
      this.password.value
    );
  }
  signInWithGoogle() {
    this._auth.signInWithGoogle();
  }
}
