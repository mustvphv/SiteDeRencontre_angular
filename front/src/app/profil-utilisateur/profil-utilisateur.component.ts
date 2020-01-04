import { Component, OnInit } from '@angular/core';
import { Infos } from '../infos';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.css']
})
export class ProfilUtilisateurComponent implements OnInit {
  profile = {name: "Nom Prenom", genre: "Homme",  mail: "test@gmail.com", photo: "assets/img/profilimage.jpg"}

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  pseudo: string;
  infos = []; // : object; //Observable<object>;
  // private headers = new Headers({ 'Content-Type': 'application/json' });
  ngOnInit() {
    localStorage.setItem('discussion', 'HorsDiscussion');

    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));
    console.log('valeurAuthToken=' + valeurAuthToken);


    this.pseudo = this.route.snapshot.paramMap.get('utilisateur_nom');
    console.log('URLpseudoTHIS=' + this.pseudo);
    console.log('URL= ' + this.router.url);


    /*return this.http.get(url, { headers: new HttpHeaders({
      'Authorization': '{data}',
      'Content-Type': 'application/json',
    }), responseType: 'blob'})*/
    // this.httpClient.get<void>(`http://localhost:3000/signin/informationsUtilisateur/${this.pseudo}`);

    this.httpClient.get(`http://localhost:3000/auth/informationsUtilisateur/${this.pseudo}`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } ).subscribe((data: any) => {
      this.infos = JSON.parse(JSON.stringify(data.pseudo));
      console.log('infosSUBS=' + this.infos);

      this.profile.name = JSON.parse(JSON.stringify(data.pseudo));
      this.profile.genre = JSON.parse(JSON.stringify(data.physiqueGenre));
      this.profile.mail = JSON.parse(JSON.stringify(data.email));

      this.profile.photo = 'data:image/jpg;base64,' + JSON.parse(JSON.stringify(data.photoDeProfilEncodeBase64));
    }, err => {
      this.router.navigate(['/connexion_page_acceuil']);
    } );


    console.log('infos=' + this.infos);



  }


  rechercheDeProfilsCompatibles() {
    this.router.navigate(['/profil_utilisateur/', this.pseudo, 'rencontres']);
  }


  voirMessages() {
    this.router.navigate(['/profil_utilisateur/', this.pseudo, 'discussions']);
  }

}
