import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [...ProductsRoutingModule.components],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
