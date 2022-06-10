import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  declarations: [...NavigationRoutingModule.components],
  imports: [CommonModule, SharedModule, NavigationRoutingModule],
})
export class NavigationModule {}
