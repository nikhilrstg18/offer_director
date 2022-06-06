import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';

@NgModule({
  declarations: [OfferComponent, CreateOfferComponent],
  imports: [CommonModule, SharedModule, OfferRoutingModule],
})
export class OfferModule {}
