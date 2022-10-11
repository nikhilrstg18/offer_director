import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { OfferGridComponent } from './components/offer-grid/offer-grid.component';
import { OfferComponent } from './components/offer/offer.component';
import { OffersComponent } from './components/offers/offers.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent,
  },
  {
    path: 'create',
    component: CreateOfferComponent,
  },
  {
    path: 'edit/:id',
    component: CreateOfferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {
  static components: any[] = [
    OffersComponent,
    OfferComponent,
    CreateOfferComponent,
    OfferGridComponent,
  ];
}
