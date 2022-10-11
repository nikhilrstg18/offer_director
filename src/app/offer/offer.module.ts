import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from './../shared/shared.module';
import { OfferRoutingModule } from './offer-routing.module';

@NgModule({
  declarations: [...OfferRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    OfferRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class OfferModule {}
