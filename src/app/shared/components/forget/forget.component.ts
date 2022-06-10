import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'od-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {}

  resetPassword() {
    this._auth.forgetPassword(this.username.value);
  }
}
