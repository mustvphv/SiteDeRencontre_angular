import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { Connexion_page_acceuilComponent } from './connexion_page_acceuil/connexion_page_acceuil.component';
import { Inscription_page_acceuilComponent } from './inscription_page_acceuil/inscription_page_acceuil.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProfilUtilisateurComponent } from './profil-utilisateur/profil-utilisateur.component';
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { RencontresComponent } from './rencontres/rencontres.component';

import { AppRoutingModule } from './app-routing.module';
import { FootBarComponent } from './foot-bar/foot-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material';
import {MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

import { CheckPseudoService } from './checkPseudo.service';
import { CheckEmailService } from './checkEmail.service';
import { TopBarProfilUtilisateurComponent } from './top-bar-profil-utilisateur/top-bar-profil-utilisateur.component';
import { TopBarRencontresComponent } from './top-bar-rencontres/top-bar-rencontres.component';
import { ChatComponent } from './chat/chat.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DiscussionsComponent } from './discussions/discussions.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};



@NgModule({
   imports: [
      NgbModule,
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      AppRoutingModule,
      NgxUsefulSwiperModule,
      WavesModule,
      ButtonsModule,
      IconsModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatOptionModule,
      MatSelectModule,
      MatIconModule,
      MatToolbarModule,
      SocketIoModule.forRoot(config)
   ],
   declarations: [
      AppComponent,
      TopBarComponent,
      Connexion_page_acceuilComponent,
      Inscription_page_acceuilComponent,
      CarouselComponent,
      ProfilUtilisateurComponent,
      PageAcceuilComponent,
      RencontresComponent,
      FootBarComponent,
      RencontresComponent,
      FootBarComponent,
      TopBarProfilUtilisateurComponent,
      TopBarRencontresComponent,
      ChatComponent,
      DiscussionsComponent
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [CheckPseudoService, CheckEmailService]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
