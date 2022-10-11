import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'od-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  title: string = 'Offers';
  constructor() {}

  ngOnInit(): void {}
}
