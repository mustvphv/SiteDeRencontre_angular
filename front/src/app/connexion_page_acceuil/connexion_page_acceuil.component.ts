import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-connexion_page_acceuil',
  templateUrl: './connexion_page_acceuil.component.html',
  styleUrls: ['./connexion_page_acceuil.component.css']
})
export class Connexion_page_acceuilComponent implements OnInit {

  formulaireConnexion: FormGroup;

  hide = true;

  messageErreur = '';


  constructor(private dataService: DataService, private httpClient: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }





    ngOnInit() {

      this.formulaireConnexion = this.fb.group({
        pseudo: ['', [Validators.required]],

        motDePasse: ['', [Validators.required]]

    } );


  }


  json_reponse_str: Observable<object>;
  tokenResponse: string;
  returnUrl: string;
  erreurConnexion = 0;

  connexionUtilisateur() {

    console.log('pseudo' + this.formulaireConnexion.get('pseudo').value);


    this.json_reponse_str = this.httpClient.post('http://localhost:3000/auth/connexion', {
        pseudo: this.formulaireConnexion.get('pseudo').value,
        motDePasse: this.formulaireConnexion.get('motDePasse').value
    });


    this.json_reponse_str
    .subscribe(
    val => {
      console.log(val);
      this.erreurConnexion = 0;
      let valStrParsed = JSON.parse(JSON.stringify(val));
      this.tokenResponse = valStrParsed.token;
      console.log('access token =' + this.tokenResponse);

      this.router.navigateByUrl(this.returnUrl);

      this.router.navigate(['/profil_utilisateur', this.formulaireConnexion.get('pseudo').value]);
      localStorage.setItem('auth_token', this.tokenResponse);


    },
    error => console.log(error));
    this.erreurConnexion = 1;


  }


}

