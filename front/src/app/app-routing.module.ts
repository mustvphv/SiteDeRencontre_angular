import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Connexion_page_acceuilComponent } from './connexion_page_acceuil/connexion_page_acceuil.component';
import { Inscription_page_acceuilComponent } from './inscription_page_acceuil/inscription_page_acceuil.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProfilUtilisateurComponent } from './profil-utilisateur/profil-utilisateur.component';
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { RencontresComponent } from './rencontres/rencontres.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: PageAcceuilComponent }, 
    { path: 'connexion_page_acceuil', component: Connexion_page_acceuilComponent },
    { path: 'inscription_page_acceuil', component: Inscription_page_acceuilComponent },
    { path: 'profil_utilisateur', component: ProfilUtilisateurComponent },
    { path: 'rencontres', component: RencontresComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
