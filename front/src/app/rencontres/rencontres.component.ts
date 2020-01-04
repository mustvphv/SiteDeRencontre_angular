import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rencontres',
  templateUrl: './rencontres.component.html',
  styleUrls: ['./rencontres.component.css']
})
export class RencontresComponent implements OnInit {
  config: any = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 200
  };


  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  pseudo: string;
  infos = [];
  infosUtilisateurCourant: any;
  slides = [];

  ngOnInit() {

    if (JSON.parse(JSON.stringify(localStorage.getItem('discussion'))) === 'DejaUneDiscussion') {
      window.location.reload();
      localStorage.setItem('discussion', 'HorsDiscussion');
    }


    this.pseudo = this.route.snapshot.paramMap.get('utilisateur_nom');


    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));
    console.log('valeurAuthToken=' + valeurAuthToken);


    this.pseudo = this.route.snapshot.paramMap.get('utilisateur_nom');
    console.log('URLpseudoTHIS=' + this.pseudo);
    console.log('URL= ' + this.router.url);


    this.httpClient.get(`http://localhost:3000/auth/informationsUtilisateur/${this.pseudo}`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } ).subscribe((data: any) => {
      this.infos = JSON.parse(JSON.stringify(data.pseudo));



    }, err => {
      this.router.navigate(['/connexion_page_acceuil']);
    } );


    this.rechercheProfilsCompatibles();

  }


  redirectionProfil() {
    this.router.navigate(['/profil_utilisateur', this.pseudo]);
  }

  discussion(pseudoSlide: string) {
    this.router.navigate(['/profil_utilisateur/', this.pseudo, 'discussion', pseudoSlide]);
  }


  rechercheProfilsCompatibles() {
    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));

    this.httpClient.get('http://localhost:3000/auth/informationsTousLesUtilisateurs', { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } ).subscribe((data: any) => {

      this.infos = data;

      const pseudoProfilCourant = this.pseudo;
      for (let i = 0; i < this.infos.length; i++) {
        // console.log(this.infos[i]);

        if (this.infos[i].pseudo === pseudoProfilCourant) {
            this.infosUtilisateurCourant = this.infos[i];
        }
      }


      console.log('infosSUP' + this.infosUtilisateurCourant.id + 'infosMAX' + this.infosUtilisateurCourant.preferenceCouleurCheveu);

      let profilsLesPlusCompatibles = new Map();
      let profilsAAfficher = new Map();
      profilsLesPlusCompatibles.clear();

      for (let i = 0; i < this.infos.length; i++) {

        let utilisateur = this.infos[i];

        if (utilisateur.id !== this.infosUtilisateurCourant.id) {
            let nombreDePointsDeCompatibilite = 0;

            if (utilisateur.physiqueGenre === this.infosUtilisateurCourant.preferenceGenre
              && utilisateur.preferenceGenre === this.infosUtilisateurCourant.physiqueGenre) {
                nombreDePointsDeCompatibilite += 1000;
            } else {
                nombreDePointsDeCompatibilite -= 100000;
            }

            if (utilisateur.physiqueTaille === this.infosUtilisateurCourant.preferenceTaille) {
              nombreDePointsDeCompatibilite += 500;
            }

            if (utilisateur.physiqueCouleurPeau === this.infosUtilisateurCourant.preferenceCouleurPeau) {
              nombreDePointsDeCompatibilite += 400;
            }

            if (utilisateur.physiqueCouleurCheveu === this.infosUtilisateurCourant.preferenceCouleurCheveu) {
              nombreDePointsDeCompatibilite += 300;
            }

            if (utilisateur.physiqueCouleurYeux === this.infosUtilisateurCourant.preferenceCouleurYeux) {
              nombreDePointsDeCompatibilite += 200;
            }



            if (utilisateur.preferenceTaille === this.infosUtilisateurCourant.physiqueTaille) {
              nombreDePointsDeCompatibilite += 510;
            }

            if (utilisateur.preferenceCouleurPeau === this.infosUtilisateurCourant.physiqueCouleurPeau) {
              nombreDePointsDeCompatibilite += 410;
            }

            if (utilisateur.preferenceCouleurCheveu === this.infosUtilisateurCourant.physiqueCouleurCheveu) {
              nombreDePointsDeCompatibilite += 310;
            }

            if (utilisateur.preferenceCouleurYeux === this.infosUtilisateurCourant.physiqueCouleurYeux) {
              nombreDePointsDeCompatibilite += 210;
            }


            if (nombreDePointsDeCompatibilite >= 1000) {
              profilsLesPlusCompatibles.set(utilisateur.pseudo, nombreDePointsDeCompatibilite);
            }



        }

      }


      let profils_it = 0;
      let profilsTaillesOrigine = profilsLesPlusCompatibles.size;

      while (profils_it < profilsTaillesOrigine) {
      let cleArray = new Array();

      for (let cle of profilsLesPlusCompatibles.keys()) {
          // console.log('PSEUDO compatibles=' + key);

          cleArray.push(profilsLesPlusCompatibles.get(cle));
      }

      let max = cleArray[0];
      for (let i = 0; i < cleArray.length; i++) {
        if (cleArray[i] > max) {
            max = cleArray[i];
        }
      }

      console.log('max' + max);

      for (let [cle, valeur] of profilsLesPlusCompatibles.entries()) {
          console.log('valeur' + valeur);
          if (valeur === max) {
              profilsAAfficher.set(cle, valeur);
              profilsLesPlusCompatibles.delete(cle);
              break;
          }
      }

      profils_it += 1;
      console.log(profils_it);
      }

      let unTiersTailleprofilsAAfficher = Math.round(profilsAAfficher.size / 3);


      if (unTiersTailleprofilsAAfficher > 50) {
          unTiersTailleprofilsAAfficher = 50;
      }

      let profilsAAfficherTiers = new Map();

      let tiersIt = 0;
      for (let [cle, valeur] of profilsAAfficher.entries()) {
          profilsAAfficherTiers.set(cle, valeur);
          tiersIt += 1;
          if (tiersIt === (unTiersTailleprofilsAAfficher) ) {
            break;
          }
      }

      for (let cle of profilsAAfficherTiers.keys()) {
        // console.log('profilsclés' + cle + ' val=' + valeur);
        this.httpClient.get(`http://localhost:3000/auth/informationsUtilisateur/${cle}`, { headers: new HttpHeaders({
        'Authorization': `Bearer ${valeurAuthToken}`,
        'Content-Type': 'application/json',
        }) } ).subscribe((data: any) => {
        this.infos = JSON.parse(JSON.stringify(data.pseudo));
        console.log('infosSUBS=' + this.infos);

        let slide1 = {nom: 'Nom', genre: "Genre", email: "Email", photo: "assets/img/profilimage.jpg"}

        slide1.nom = JSON.parse(JSON.stringify(data.pseudo));
        slide1.genre = JSON.parse(JSON.stringify(data.physiqueGenre));
        slide1.email = JSON.parse(JSON.stringify(data.email));

        slide1.photo = 'data:image/jpg;base64,' + JSON.parse(JSON.stringify(data.photoDeProfilEncodeBase64));

        this.slides.push(slide1);

    }, err => {
      this.router.navigate(['/connexion_page_acceuil']);
    } );
      }



    }, err => {
      this.router.navigate(['/connexion_page_acceuil']);
    } );

   }

}
