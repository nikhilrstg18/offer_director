import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { OfferRoutingModule } from './offer-routing.module';

@NgModule({
  declarations: [...OfferRoutingModule.components],
  imports: [CommonModule, SharedModule, OfferRoutingModule],
})
export class OfferModule {}
