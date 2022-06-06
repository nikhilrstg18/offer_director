import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'od-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  title: string = 'Offer';

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
