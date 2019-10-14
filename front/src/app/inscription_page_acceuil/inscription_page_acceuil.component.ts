import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-inscription_page_acceuil',
  templateUrl: './inscription_page_acceuil.component.html',
  styleUrls: ['./inscription_page_acceuil.component.css']
})
export class Inscription_page_acceuilComponent implements OnInit {

  constructor(private dataService: DataService, private httpClient: HttpClient) { }

  pseudo = new FormControl('pseudo');

  email = new FormControl('email');

  mot_de_passe = new FormControl('motDePasse');

  confirmation_mot_de_passe = new FormControl('confirmationMotDePasse');

  physique_genre = new FormControl('physiqueGenre');

  physique_taille = new FormControl('physiqueTaille');

  physique_couleur_peau = new FormControl('physiqueCouleurPeau');

  physique_couleur_cheveu = new FormControl('physiqueCouleurCheveu');

  physique_couleur_yeux = new FormControl('physiqueCouleurYeux');

  preference_genre = new FormControl('preferenceGenre');

  preference_taille = new FormControl('preferenceTaille');

  preference_couleur_peau = new FormControl('preferenceCouleurPeau');

  preference_couleur_cheveu = new FormControl('preferenceCouleurCheveu');

  preference_couleur_yeux = new FormControl('preferenceCouleurYeux');




  informationsDuServeur = [];


  private informationsNouvelUtilisateur = [
    {
      id: 100,
      pseudo: this.pseudo.value,
      email: this.email.value,
      motDePasse: this.mot_de_passe.value,
      confirmationMotDePasse: this.confirmation_mot_de_passe.value,
      physiqueGenre: this.physique_genre.value,
      physiqueTaille: this.physique_taille.value,
      physiqueCouleurPeau: this.physique_couleur_peau.value,
      physiqueCouleurCheveu: this.physique_couleur_cheveu.value,
      physiqueCouleurYeux: this.physique_couleur_yeux.value,
      preferenceGenre: this.preference_genre.value,
      preferenceTaille: this.preference_taille.value,
      preferenceCouleurPeau: this.preference_couleur_peau.value,
      preferenceCouleurCheveu: this.preference_couleur_cheveu.value,
      preferenceCouleurYeux: this.preference_couleur_yeux.value
    }
  ];

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any[])=>{
      console.log(data);
      this.informationsDuServeur = data;
    })
  }

  creerNouvelUtilisateur(){

    return this.httpClient
      .post('http://localhost:3000/signin/create', this.informationsNouvelUtilisateur)
      .subscribe(
        () => {
          console.log('Enregistrement d\'un nouvel utilisateur');
        },
        (error) => {
          console.log('Erreur:' + error);
        }
      );

    //this.HttpClient.post("http://localhost:3000/signin/create", this.pseudo.value, this.email.value, this.mot_de_passe.value, this.confirmation_mot_de_passe.value, this.physique_genre.value, this.physique_taille.value, this.physique_couleur_peau.value, this.physique_couleur_cheveu.value, this.physique_couleur_yeux.value, this.preference_genre.value, this.preference_taille.value, this.preference_couleur_peau.value, this.preference_couleur_cheveu.value, this.preference_couleur_yeux.value);

  }

  /*checkNameAndPassword() {

   
    if (this.mail.value == "test" && this.mot_de_passe.value == "test2") {
      this.informations.setValue("Vos informations sont correctes.\nVous allez être redirigés vers votre compte personnel.");
      
    }
    else{
      this.informations.setValue("Les informations données n'ont pas permis de vous identifier.\nVeuillez réessayez");
      
      this.mail.setValue('');
      this.mot_de_passe.setValue('');
    }

  }*/


}
