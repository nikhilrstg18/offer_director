import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferGridComponent } from './components/offer-grid/offer-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [...OfferRoutingModule.components, OfferGridComponent],
  imports: [CommonModule, SharedModule, OfferRoutingModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class OfferModule {}
