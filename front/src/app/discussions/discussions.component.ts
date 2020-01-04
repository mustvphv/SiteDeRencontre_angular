import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {


  chargementDiscussions = 0;
  pseudo = '';
  discussions = [];

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (JSON.parse(JSON.stringify(localStorage.getItem('discussion'))) === 'DejaUneDiscussion') {
      window.location.reload();
      localStorage.setItem('discussion', 'HorsDiscussion');
    }

    this.connecteOuDeconnecte();

    this.pseudo = this.route.snapshot.paramMap.get('utilisateur');

    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));

    if (this.chargementDiscussions === 0) {
      this.httpClient.get(`http://localhost:3000/chat/historiqueDiscussions/${this.pseudo}`, { headers: new HttpHeaders({
        'Authorization': `Bearer ${valeurAuthToken}`,
        'Content-Type': 'application/json',
      }) } )
      .subscribe((data: any) => {

        for (let i = 0; i < data.length; i++) {
            this.discussions.push(data[i]);
        }
      });
      this.chargementDiscussions = 1;
    }
  }

  connecteOuDeconnecte() {
    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));

    this.pseudo = this.route.snapshot.paramMap.get('utilisateur');

    this.httpClient.get(`http://localhost:3000/auth/informationsUtilisateur/${this.pseudo}`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } ).subscribe((data: any) => {

    }, err => {
      localStorage.removeItem('auth_token');
      this.router.navigate(['/connexion_page_acceuil']);
    } );
  }

  entrerDiscussion(pseudo2: string) {
    this.router.navigate(['/profil_utilisateur/', this.pseudo, 'discussion', pseudo2]);
  }

}

