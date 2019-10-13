import { Component, OnInit } from '@angular/core';
import { Infos } from '../infos';
@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.css']
})
export class ProfilUtilisateurComponent implements OnInit {
  profile = {name: "Nom Prenom", genre: "Homme", job: "Etudtiant",  mail: "test@gmail.com"}

  constructor() { }

  ngOnInit() {
  }

}
