import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { Connexion_page_acceuilComponent } from './connexion_page_acceuil/connexion_page_acceuil.component';
import { Inscription_page_acceuilComponent } from './inscription_page_acceuil/inscription_page_acceuil.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProfilUtilisateurComponent } from './profil-utilisateur/profil-utilisateur.component';
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    NgbModule,  
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    Connexion_page_acceuilComponent,
    Inscription_page_acceuilComponent,
    CarouselComponent,
    ProfilUtilisateurComponent,
    PageAcceuilComponent
  ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
