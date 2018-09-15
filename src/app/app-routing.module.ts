import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResultsComponent} from './results/results.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {path: 'results/:keywords', component: ResultsComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
