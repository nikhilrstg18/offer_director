import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'od-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  title: string = 'Offer';
  params: any;
  mode: any;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.params = params.get('id');
    });
    this._route.queryParamMap.subscribe((queryParams) => {
      this.mode = queryParams.get('mode');
    });
  }
}
