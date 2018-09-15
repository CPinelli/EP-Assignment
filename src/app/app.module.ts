import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ResultsComponent} from './results/results.component';
import {AppRoutingModule} from './app-routing.module';
import {CartComponent} from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
