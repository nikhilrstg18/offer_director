import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../home/home.module').then((h) => h.HomeModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./../admin/admin.module').then((a) => a.AdminModule),
      },
      {
        path: 'offer',
        loadChildren: () =>
          import('./../offer/offer.module').then((o) => o.OfferModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./../products/products.module').then((p) => p.ProductsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationRoutingModule {
  static components: any[] = [NavigationComponent];
}
