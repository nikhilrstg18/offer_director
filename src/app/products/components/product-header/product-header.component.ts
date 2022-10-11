import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'od-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss'],
})
export class ProductHeaderComponent implements OnInit {
  foods: Food[] = [
    { value: 'asc', viewValue: 'Ascending' },
    { value: 'desc', viewValue: 'Descending' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

interface Food {
  value: string;
  viewValue: string;
}
