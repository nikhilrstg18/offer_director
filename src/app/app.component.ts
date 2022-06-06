import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Offer Director';
  loginValid: boolean = true;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    // if (!this.loginValid) {
    //   this._router.navigateByUrl('/login');
    // } else {
    //   this._router.navigateByUrl('/');
    // }
  }
}
