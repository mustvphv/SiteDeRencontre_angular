import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-inscription_page_acceuil',
  templateUrl: './inscription_page_acceuil.component.html',
  styleUrls: ['./inscription_page_acceuil.component.css']
})
export class Inscription_page_acceuilComponent implements OnInit {

  mail = new FormControl('mail');

  mot_de_passe = new FormControl('mot_de_passe');

  informations = new FormControl('informations');


  constructor() { }

  ngOnInit() {
  }

  checkNameAndPassword() {
    /*console.log("checkname");
    console.log("string=" + this.mail.value);*/
    if (this.mail.value == "test" && this.mot_de_passe.value == "test2") {
      this.informations.setValue("Vos informations sont correctes.\nVous allez être redirigés vers votre compte personnel.");
      
    }
    else{
      this.informations.setValue("Les informations données n'ont pas permis de vous identifier.\nVeuillez réessayez");
      
      this.mail.setValue('');
      this.mot_de_passe.setValue('');
    }

  }


}
