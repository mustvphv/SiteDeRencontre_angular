import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { Connexion_page_acceuilComponent } from './cart/connexion_page_acceuil/connexion_page_acceuil.component';
import { Inscription_page_acceuilComponent } from './cart/inscription_page_acceuil/inscription_page_acceuil.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'cart', component: CartComponent },
      { path: 'connexion_page_acceuil', component: Connexion_page_acceuilComponent },
      { path: 'inscription_page_acceuil', component: Inscription_page_acceuilComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    CartComponent,
    Connexion_page_acceuilComponent,
    Inscription_page_acceuilComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [CartService]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/