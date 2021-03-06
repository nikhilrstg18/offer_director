import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { OfferComponent } from './components/offer/offer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OfferComponent,
      },
      {
        path: 'create',
        component: CreateOfferComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {
  static components: any[] = [OfferComponent, CreateOfferComponent];
}
