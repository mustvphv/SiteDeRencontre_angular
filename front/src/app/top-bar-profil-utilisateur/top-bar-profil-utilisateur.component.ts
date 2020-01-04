import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-profil-utilisateur',
  templateUrl: './top-bar-profil-utilisateur.component.html',
  styleUrls: ['./top-bar-profil-utilisateur.component.css']
})
export class TopBarProfilUtilisateurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  deconnexionUtilisateur() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('discussion');
    this.router.navigate(['/']);
  }

}
