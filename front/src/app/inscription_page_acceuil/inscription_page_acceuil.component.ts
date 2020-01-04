import { Component, OnInit, ElementRef, ViewChild , ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, NgForm, FormGroupDirective, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DataService } from '../data.service';
import { CheckPseudoService } from '../checkPseudo.service';
import { CheckEmailService } from '../checkEmail.service';
import { UploadImageService } from '../upload-image.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throttleTime, debounceTime } from 'rxjs/operators';
// import { Validateurs_inscriptionComponent } from '../validateurs_inscription/validateurs_inscription.component';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

function  recherchePseudoExisteDeja(control: AbstractControl, checkPseudoService: CheckPseudoService): ValidationErrors | null {
  // checkPseudoService: CheckPseudoService;

  control.get('pseudo').valueChanges.pipe().subscribe((data: string) => {
    console.log(data);
    checkPseudoService.checkPseudo(control.get('pseudo').value)
      .subscribe(
        err => {
          console.log(err);
          return {pseudoExist: false};
        },

        (_) => {
        control.get('pseudo').setErrors({
          pseudoExist: true
        });
        return {pseudoExist: true};
      });
  });
  return null;

}



export interface PhysiqueGenre {
  nom: string;
  sortie: string;
}

export interface PhysiqueTaille {
  nom: string;
  sortie: string;
}

export interface PhysiqueCouleurPeau {
  nom: string;
  sortie: string;
}

export interface PhysiqueCouleurCheveu {
  nom: string;
  sortie: string;
}


export interface PhysiqueCouleurYeux {
  nom: string;
  sortie: string;
}

export interface PreferenceGenre {
  nom: string;
  sortie: string;
}

export interface PreferenceTaille {
  nom: string;
  sortie: string;
}

export interface PreferenceCouleurPeau {
  nom: string;
  sortie: string;
}

export interface PreferenceCouleurCheveu {
  nom: string;
  sortie: string;
}


export interface PreferenceCouleurYeux {
  nom: string;
  sortie: string;
}



@Component({
  selector: 'app-inscription_page_acceuil',
  templateUrl: './inscription_page_acceuil.component.html',
  styleUrls: ['./inscription_page_acceuil.component.css']
})
export class Inscription_page_acceuilComponent implements OnInit {

  @ViewChild('fileInput', { read: ElementRef, static: false }) private fileInput: ElementRef;


  hide = true;

  matcher = new MyErrorStateMatcher();

  formulaireValidation: FormGroup;
  pseudoExisteDeja = 0;
  emailExisteDeja = 0;

  messageErreurPasDePhoto = 'Vous ne pouvez pas vous inscrire sans photo.';
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };


  creationUtilisateur = 0;
  appuiButtonCreationUtilisateur = 0;

  constructor(
    private dataService: DataService,
    private httpClient: HttpClient,
    private checkPseudoService: CheckPseudoService,
    private checkEmailService: CheckEmailService,
    private uploadPhotoDeProfilService: UploadImageService,
    private fb: FormBuilder) {

/*
    this.formulaireValidationMotDePasse = this.fb.group({
      motDePasse: ['', [Validators.required]],
      confirmationMotDePasse: ['']
    }, { validator: Validators.compose([this.verificationMotDePasse,
      this.nombreMinimumDeCaracteresMotDePasseValidation,
      this.nombreMaximumDeCaracteresMotDePasseValidation,
      this.nombreDeChiffresMotDePasseValidation,
      this.nombreDeLettresMotDePasseValidation]) } );

    this.formulaireValidationPseudo = this.fbPseudo.group({
      pseudo: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        Validators.pattern('[a-zA-Z0-9-]+'),
        this.FonctionTest ] ] });

    this.formulaireValidationEmail = this.fbEmail.group({
      email: ['', [Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          this.FonctionTest ] ] });*/


/*    this.fbMotDePasse.group({
      motDePasse: ['', [Validators.required]],
      confirmationMotDePasse: ['']
    }, { validator: Validators.compose([this.verificationMotDePasse,
      this.nombreMinimumDeCaracteresMotDePasseValidation,
      this.nombreMaximumDeCaracteresMotDePasseValidation,
      this.nombreDeChiffresMotDePasseValidation,
      this.nombreDeLettresMotDePasseValidation]) } );*/
  }


  // physiqueGenreControl = new FormControl('', [Validators.required]);
  // selectFormControlPhysiqueGenre = new FormControl('', Validators.required);
  physiqueGenres: PhysiqueGenre[] = [
    {nom: 'Homme', sortie: 'Validé'},
    {nom: 'Femme', sortie: 'Validé'},
  ];

  // physiqueTailleControl = new FormControl('', [Validators.required]);
  // selectFormControlPhysiqueTaille = new FormControl('', Validators.required);
  physiqueTailles: PhysiqueGenre[] = [
    {nom: '<1m50', sortie: 'Validé'},
    {nom: '1m50-1m59', sortie: 'Validé'},
    {nom: '1m60-1m69', sortie: 'Validé'},
    {nom: '1m70-1m79', sortie: 'Validé'},
    {nom: '1m80-1m89', sortie: 'Validé'},
    {nom: '1m90-1m99', sortie: 'Validé'},
    {nom: '2m00-2m09', sortie: 'Validé'},
    {nom: '>2m10', sortie: 'Validé'},
  ];

  // physiqueCouleurPeauControl = new FormControl('', [Validators.required]);
  // selectFormControlPhysiqueCouleurPeau = new FormControl('', Validators.required);
  physiqueCouleurPeaux: PhysiqueCouleurPeau[] = [
    {nom: 'pâle', sortie: 'Validé'},
    {nom: 'blanc', sortie: 'Validé'},
    {nom: 'bronzé', sortie: 'Validé'},
    {nom: 'mate', sortie: 'Validé'},
    {nom: 'marron', sortie: 'Validé'},
    {nom: 'noir', sortie: 'Validé'},
  ];

  // physiqueCouleurCheveuControl = new FormControl('', [Validators.required]);
  // selectFormControlPhysiqueCouleurCheveu = new FormControl('', Validators.required);
  physiqueCouleurCheveux: PhysiqueCouleurCheveu[] = [
    {nom: 'brun', sortie: 'Validé'},
    {nom: 'blond', sortie: 'Validé'},
    {nom: 'roux', sortie: 'Validé'},
    {nom: 'noir', sortie: 'Validé'},
    {nom: 'gris', sortie: 'Validé'},
    {nom: 'blanc', sortie: 'Validé'},
    {nom: 'chauve', sortie: 'Validé'},
  ];

  // physiqueCouleurYeuxControl = new FormControl('', [Validators.required]);
  // selectFormControlPhysiqueCouleurYeux = new FormControl('', Validators.required);
  physiqueCouleurYeuxs: PhysiqueCouleurYeux[] = [
    {nom: 'marron', sortie: 'Validé'},
    {nom: 'vert', sortie: 'Validé'},
    {nom: 'bleu', sortie: 'Validé'},
    {nom: 'noir', sortie: 'Validé'},
    {nom: 'gris', sortie: 'Validé'},
  ];


  // preferenceGenreControl = new FormControl('', [Validators.required]);
  // selectFormControlPreferenceGenre = new FormControl('', Validators.required);
  preferenceGenres: PreferenceGenre[] = [
    {nom: 'Homme', sortie: 'Validé'},
    {nom: 'Femme', sortie: 'Validé'},
  ];

  // preferenceTailleControl = new FormControl('', [Validators.required]);
  // selectFormControlPreferenceTaille = new FormControl('', Validators.required);
  preferenceTailles: PreferenceGenre[] = [
    {nom: '<1m50', sortie: 'Validé'},
    {nom: '1m50-1m59', sortie: 'Validé'},
    {nom: '1m60-1m69', sortie: 'Validé'},
    {nom: '1m70-1m79', sortie: 'Validé'},
    {nom: '1m80-1m89', sortie: 'Validé'},
    {nom: '1m90-1m99', sortie: 'Validé'},
    {nom: '2m00-2m09', sortie: 'Validé'},
    {nom: '>2m10', sortie: 'Validé'},
  ];

  // preferenceCouleurPeauControl = new FormControl('', [Validators.required]);
  // selectFormControlPreferenceCouleurPeau = new FormControl('', Validators.required);
  preferenceCouleurPeaux: PreferenceCouleurPeau[] = [
    {nom: 'pâle', sortie: 'Validé'},
    {nom: 'blanc', sortie: 'Validé'},
    {nom: 'bronzé', sortie: 'Validé'},
    {nom: 'mate', sortie: 'Validé'},
    {nom: 'marron', sortie: 'Validé'},
    {nom: 'noir', sortie: 'Validé'},
  ];

  // preferenceCouleurCheveuControl = new FormControl('', [Validators.required]);
  // selectFormControlPreferenceCouleurCheveu = new FormControl('', Validators.required);
  preferenceCouleurCheveux: PreferenceCouleurCheveu[] = [
    {nom: 'brun', sortie: 'Validé'},
    {nom: 'blond', sortie: 'Validé'},
    {nom: 'roux', sortie: 'Validé'},
    {nom: 'noir', sortie: 'Validé'},
    {nom: 'gris', sortie: 'Validé'},
    {nom: 'blanc', sortie: 'Validé'},
    {nom: 'chauve', sortie: 'Validé'},
  ];

  // preferenceCouleurYeuxControl = new FormControl('', [Validators.required]);
  // selectFormControlPreferenceCouleurYeux = new FormControl('', Validators.required);
  preferenceCouleurYeuxs: PreferenceCouleurYeux[] = [
    {nom: 'marron', sortie: 'Validé'},
    {nom: 'vert', sortie: 'Validé'},
    {nom: 'bleu', sortie: 'Validé'},
    {nom: 'noir', sortie: 'Validé'},
    {nom: 'gris', sortie: 'Validé'},
  ];

  pseudoValide = true;
  emailValide = true;
  motDePasseValide = true;
  physiqueGenreValide = true;
  physiqueTailleValide = true;
  physiqueCouleurPeauValide = true;
  physiqueCouleurCheveuValide = true;
  physiqueCouleurYeuxValide = true;
  preferenceGenreValide = true;
  preferenceTailleValide = true;
  preferenceCouleurPeauValide = true;
  preferenceCouleurCheveuValide = true;
  preferenceCouleurYeuxValide = true;

  messageErreur = '';


  // pseudo = new FormControl('pseudo');

  //email = new FormControl('email');


  informationsDuServeur = [];


  pseudoChoix = 'pas encore choisi';
  emailChoix = 'pas encore choisi';
  motDePasseChoix = 'pas encore choisi';
  physiqueGenreChoix = 'pas encore choisi';
  physiqueTailleChoix = 'pas encore choisi';
  physiqueCouleurPeauChoix = 'pas encore choisi';
  physiqueCouleurCheveuChoix = 'pas encore choisi';
  physiqueCouleurYeuxChoix = 'pas encore choisi';
  preferenceGenreChoix = 'pas encore choisi';
  preferenceTailleChoix = 'pas encore choisi';
  preferenceCouleurPeauChoix = 'pas encore choisi';
  preferenceCouleurCheveuChoix = 'pas encore choisi';
  preferenceCouleurYeuxChoix = 'pas encore choisi';


  informationsNouvelUtilisateur = [
    {
      pseudo: this.pseudoChoix,
      email: this.emailChoix,
      motDePasse: this.motDePasseChoix,
      physiqueGenre: this.physiqueGenreChoix,
      physiqueTaille: this.physiqueTailleChoix,
      physiqueCouleurPeau: this.physiqueCouleurPeauChoix,
      physiqueCouleurCheveu: this.physiqueCouleurCheveuChoix,
      physiqueCouleurYeux: this.physiqueCouleurYeuxChoix,
      preferenceGenre: this.preferenceGenreChoix,
      preferenceTaille: this.preferenceTailleChoix,
      preferenceCouleurPeau: this.preferenceCouleurPeauChoix,
      preferenceCouleurCheveu: this.preferenceCouleurCheveuChoix,
      preferenceCouleurYeux: this.preferenceCouleurYeuxChoix
    }
  ];
  
  ClickSurPseudoForm() {
    this.pseudoValide = true;
  }

  ClickSurEmailForm() {
    this.emailValide = true;
  }

  ClickSurMotDePasseForm() {
    this.motDePasseValide = true;
  }

  ClickSurPhysiqueGenreForm() {
    console.log('avant this physiqueGenreValide =' + this.physiqueGenreValide);
    this.physiqueGenreValide = true;
  }

  ClickSurPhysiqueTailleForm() {
    this.physiqueTailleValide = true;
  }

  ClickSurPhysiqueCouleurPeauForm() {
    this.physiqueCouleurPeauValide = true;
  }

  ClickSurPhysiqueCouleurCheveuForm() {
    this.physiqueCouleurCheveuValide = true;
  }

  ClickSurPhysiqueCouleurYeuxForm() {
    this.physiqueCouleurYeuxValide = true;
  }



  ClickSurPreferenceGenreForm() {
    this.preferenceGenreValide = true;
  }

  ClickSurPreferenceTailleForm() {
    this.preferenceTailleValide = true;
  }

  ClickSurPreferenceCouleurPeauForm() {
    this.preferenceCouleurPeauValide = true;
  }

  ClickSurPreferenceCouleurCheveuForm() {
    this.preferenceCouleurCheveuValide = true;
  }

  ClickSurPreferenceCouleurYeuxForm() {
    this.preferenceCouleurYeuxValide = true;
  }

  ngOnInit() {

    this.formulaireValidation = this.fb.group({
      pseudo: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d10-9-]+') ] ],
        // Validators.pattern('[a-zA-Z0-9-]+')

      email: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')] ],

      physiqueGenreControl: ['', [Validators.required]],

      physiqueTailleControl: ['', [Validators.required]],

      physiqueCouleurPeauControl: ['', [Validators.required]],

      physiqueCouleurCheveuControl: ['', [Validators.required]],

      physiqueCouleurYeuxControl: ['', [Validators.required]],

      preferenceGenreControl: ['', [Validators.required]],

      preferenceTailleControl: ['', [Validators.required]],

      preferenceCouleurPeauControl: ['', [Validators.required]],

      preferenceCouleurCheveuControl: ['', [Validators.required]],

      preferenceCouleurYeuxControl: ['', [Validators.required]],

      photoDeProfil: null,

      motDePasseGroupe: this.fb.group({
        motDePasse: ['', [Validators.required]],
        confirmationMotDePasse: ['', [Validators.required, this.nombreMinimumDeCaracteresMotDePasseValidation,
          this.nombreMaximumDeCaracteresMotDePasseValidation,
          this.nombreDeChiffresMotDePasseValidation,
          this.nombreDeLettresMotDePasseValidation]] }
    , {validator: Validators.compose([this.verificationMotDePasse]) } )

  } );


    this.recherchePseudoExisteDeja();
    this.rechercheEmailExisteDeja();
  }

  onFileChangeANC(event) {
    console.log('eventonFileChange' + event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulaireValidation.get('photoDeProfil').setValue(file);
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    this.formulaireValidation.get('photoDeProfil').valueChanges.pipe().subscribe((data: string) => {
      console.log('valeur de la photo' + data);
    } );
  }



  imgURL: any;
  imageEncodeBase64: string;

  onFileChange(event) {
    //this.uploadStatus = 0;
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log('dans onfilechange if' + file);
      let reader = new FileReader();

      reader.readAsDataURL(file);


      reader.onload = () => {
        this.imgURL = reader.result;
        this.formulaireValidation.get('photoDeProfil').setValue({
          photoDeProfilNom: file.name,
          photoDeProfilType: file.type,
          photoDeProfilValeur: (reader.result as string).split(',')[1]
        });
        console.log('this.formulaireValidation.get(\'photoDeProfil\').value.photoDeProfilNom'
        + this.formulaireValidation.get('photoDeProfil').value.photoDeProfilValeur);

        this.imageEncodeBase64 = this.formulaireValidation.get('photoDeProfil').value.photoDeProfilValeur;
      };

      this.formulaireValidation.get('photoDeProfil').setValue(file);
    }
  }


  fichierInfos : any;
  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.formulaireValidation.get('photoDeProfil').value);
    this.fichierInfos = formData;
    console.log(this.fichierInfos.entries.name.value);
    console.log('profil' + this.formulaireValidation.get('photoDeProfil').value.replace("C:\\fakepath\\", "") );

    let reader = new FileReader();

    reader.readAsDataURL(this.formulaireValidation.get('photoDeProfil').value);
    //console.log(this.formulaireValidation.get('photoDeProfil').value);

    this.uploadPhotoDeProfilService.upload(formData, this.userId).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.messageErreurPasDePhoto = err
    );
  }


  FonctionTest(formControlPseudoChoisi: FormControl) {
    return {test: false};
  }

  RepererChangementEmail(str: string) {
    console.log('changement detecté' + str);

    if (this.informationsDuServeur != null || this.informationsDuServeur !== undefined) {
      for (let it = 0; it < this.informationsDuServeur.length; it++) {
        if (str === this.informationsDuServeur[it].email) {
          this.emailExisteDeja = 1;
          return null;
        } else {
          this.emailExisteDeja = 0;
        }
      }
    }
  }

  booleanValeurS = false;

  recherchePseudoExisteDeja(/*formControlPseudoChoisi: FormControl*/) {


    this.formulaireValidation.get('pseudo').valueChanges.pipe().subscribe((data: string) => {
        // console.log(data);
        this.checkPseudoService.checkPseudo(this.formulaireValidation.get('pseudo').value)
          .subscribe(
            //data => console.log(data),
            err => {
              console.log('dans err' + err);
              let valeurRequired = this.formulaireValidation.get('pseudo').hasError('required');
              let valeurMinLength = this.formulaireValidation.get('pseudo').hasError('minlength');
              let valeurMaxLength = this.formulaireValidation.get('pseudo').hasError('maxlength');
              let valeurPattern = this.formulaireValidation.get('pseudo').hasError('pattern');

              if (err === true) {
                this.formulaireValidation.get('pseudo').setErrors({
                  pseudoExist: true,
                  required: valeurRequired,
                  minlength: valeurMinLength,
                  maxlength: valeurMaxLength,
                  pattern: valeurPattern
                });

              }
              if (err === false) {
                this.formulaireValidation.get('pseudo').setErrors({
                  pseudoExist: false,
                  required: valeurRequired,
                  minlength: valeurMinLength,
                  maxlength: valeurMaxLength,
                  pattern: valeurPattern
                });
              }
            },
            //() => console.log('yay')


            (_) => {
              let valeurRequired = this.formulaireValidation.get('pseudo').hasError('required');
              let valeurMinLength = this.formulaireValidation.get('pseudo').hasError('minlength');
              let valeurMaxLength = this.formulaireValidation.get('pseudo').hasError('maxlength');
              let valeurPattern = this.formulaireValidation.get('pseudo').hasError('pattern');

              this.formulaireValidation.get('pseudo').setErrors({
                pseudoExist: true,
                required: valeurRequired,
                minlength: valeurMinLength,
                maxlength: valeurMaxLength,
                pattern: valeurPattern
              });

          });
    });


  }

  rechercheEmailExisteDeja() {

    this.formulaireValidation.get('email').valueChanges.pipe().subscribe((data: string) => {
      // console.log(data);
      this.checkEmailService.checkEmail(this.formulaireValidation.get('email').value)
        .subscribe(
          
          data_r => {
            // console.log(data_r);

            let valeurRequired = this.formulaireValidation.get('email').hasError('required');
            let valeurPattern = this.formulaireValidation.get('email').hasError('pattern');

            if (data_r === true) {
              this.formulaireValidation.get('email').setErrors({
                emailExist: true,
                required: valeurRequired,
                pattern: valeurPattern
              });
            }
            if (data_r === false) {
              this.formulaireValidation.get('email').setErrors({
                emailExist: false,
                required: valeurRequired,
                pattern: valeurPattern
              });
            }

          },


          (_) => {
            let valeurRequired = this.formulaireValidation.get('email').hasError('required');
            let valeurPattern = this.formulaireValidation.get('email').hasError('pattern');
            this.formulaireValidation.get('email').setErrors({
                emailExist: true,
                required: valeurRequired,
                pattern: valeurPattern
            });
        });
  });



  }

  choixPseudoFait() {
    if (this.formulaireValidation.get('pseudo').hasError('required') === false 
    && this.formulaireValidation.get('pseudo').hasError('minlength') === false
    && this.formulaireValidation.get('pseudo').hasError('maxlength') === false
    && this.formulaireValidation.get('pseudo').hasError('pattern') === false
    && this.pseudoExisteDeja === 0) {
      this.pseudoChoix = this.formulaireValidation.get('pseudo').value.pseudo;
    } else {
      this.pseudoChoix = 'erreur';
    }
    return this.pseudoChoix;
  }

  choixEmailFait() {
    if (this.formulaireValidation.get('email').hasError('required') === false
    && this.formulaireValidation.get('email').hasError('pattern') === false
    && this.emailExisteDeja === 0) {
      this.emailChoix = this.formulaireValidation.get('email').value.email;
    } else {
      this.emailChoix = 'erreur';
    }
    return this.emailChoix;
  }

  nombreDeLettresMotDePasseValidation(formControlMDPChoisi: FormControl) {
    const MDP = formControlMDPChoisi.value;

    const tailleMDP = MDP.length;

    let compteurDeLettres = 0;

    for (let iteratorTailleMDP = 0; iteratorTailleMDP < tailleMDP; iteratorTailleMDP++) {
        if (MDP[iteratorTailleMDP].charCodeAt(0) >= 65 && MDP[iteratorTailleMDP].charCodeAt(0) <= 90
          || MDP[iteratorTailleMDP].charCodeAt(0) >= 97 && MDP[iteratorTailleMDP].charCodeAt(0) <= 122) {
          compteurDeLettres++;
        }
    }

    if (compteurDeLettres >= 2) {
        return null;
    }

    return { pasAssezDeLettres: true};
}

nombreDeChiffresMotDePasseValidation(formControlMDPChoisi: FormControl) {
  const MDP = formControlMDPChoisi.value;

  const tailleMDP = MDP.length;

  let compteurDeChiffres = 0;

  for (let iteratorTailleMDP = 0; iteratorTailleMDP < tailleMDP; iteratorTailleMDP++) {
    if (MDP[iteratorTailleMDP].charCodeAt(0) >= 48 && MDP[iteratorTailleMDP].charCodeAt(0) <= 57) {
      compteurDeChiffres++;
    }
  }

  if (compteurDeChiffres >= 2) {
      return null;
  }

  return { pasAssezDeChiffres: true};
}

  nombreMaximumDeCaracteresMotDePasseValidation(formControlMDPChoisi: FormControl) {
    const MDP = formControlMDPChoisi.value;

    const tailleMDP = MDP.length;
    if(tailleMDP < 80) {
      return null;
    }
    return { tropDeCaracteres: true};
}

nombreMinimumDeCaracteresMotDePasseValidation(formControlMDPChoisi: FormControl /*group: FormGroup*/) {
    const MDP = formControlMDPChoisi.value; //.motDePasse;
    //const MDP = group.controls.motDePasse.value;
    //console.log('dans MINIMUMMM MDPdansMIN =' + MDP);

    const tailleMDP = MDP.length;
    if (tailleMDP >= 8) {
      return null;
    }
    return { pasAssezDeCaracteres: true};
}


verificationMotDePasse(formGroup: FormGroup /*formControlMDPChoisi: FormControl*/) {
  //const MDP = formControlMDPChoisi.value;
  //const confirmationMDP = formGroup.controls.confirmationMotDePasse.value;
  const MDP = formGroup.controls.motDePasse.value;
  const confirmationMDP = formGroup.controls.confirmationMotDePasse.value;

  console.log('MDP=' + MDP);
  console.log('confirmationMDP=' + confirmationMDP);

  if (MDP !== confirmationMDP && MDP !== undefined && confirmationMDP !== undefined && MDP !== null && confirmationMDP !== null) {
    console.log('il y a pas egalite');
    return { pasEquivalent: true};

  }
  return null;

}


choixMotDePasse(choix: string) {

  // tslint:disable-next-line: max-line-length
  console.log('event click mot de passe childHAS ERROR=' + this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').hasError('pasAssezDeCaracteres') + '\n');
  // console.log('event click mot de passe child=' + this.formulaireValidationMotDePasse.value.motDePasse);

  if (this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').hasError('pasAssezDeCaracteres') === false
  && this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').hasError('tropDeCaracteres') === false
  && this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').hasError('pasAssezDeChiffres') === false
  && this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').hasError('pasAssezDeLettres') === false) {
    choix = this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').value;
  } else {
    choix = 'erreur';
  }
  return choix;
  //this.MotDePasseStrChildChoisi.emit(choix);
  // this.MotDePasseStrChildChoisi.emit(choix);
}


  erreurValidation = 0;
  creerNouvelUtilisateur() {


    this.appuiButtonCreationUtilisateur = 1;
    //console.log('choix mot de passe fait avant requete sur le serveur' + this.motDePasseChoix);



    this.erreurValidation = 0;






    if (this.formulaireValidation.get('pseudo').value !== undefined
    && this.formulaireValidation.get('pseudo').hasError('required') === false
    && this.formulaireValidation.get('pseudo').hasError('minlength') === false
    && this.formulaireValidation.get('pseudo').hasError('maxlength') === false
    && this.formulaireValidation.get('pseudo').hasError('pattern') === false
    && this.formulaireValidation.get('pseudo').hasError('pseudoExist') === false) {
    } else {
      this.erreurValidation = 1;
    }


    if (this.formulaireValidation.get('email').value !== undefined
    && this.formulaireValidation.get('email').hasError('required') === false
    && this.formulaireValidation.get('email').hasError('pattern') === false
    && this.formulaireValidation.get('email').hasError('emailExist') === false) {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').value !== undefined
    && this.formulaireValidation.get('motDePasseGroupe').hasError('pasEquivalent') === false
    && this.formulaireValidation.get('motDePasseGroupe').get('confirmationMotDePasse').hasError('pasAssezDeCaracteres') === false
    && this.formulaireValidation.get('motDePasseGroupe').get('confirmationMotDePasse').hasError('tropDeCaracteres') === false
    && this.formulaireValidation.get('motDePasseGroupe').get('confirmationMotDePasse').hasError('pasAssezDeChiffres') === false
    && this.formulaireValidation.get('motDePasseGroupe').get('confirmationMotDePasse').hasError('pasAssezDeLettres') === false
    && this.formulaireValidation.get('motDePasseGroupe').get('confirmationMotDePasse').hasError('pasAssezDeCaracteres') === false
    ) {
    } else {
      this.erreurValidation = 1;
    }



    if (this.formulaireValidation.get('physiqueGenreControl').value !== undefined
    && this.formulaireValidation.get('physiqueGenreControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('physiqueTailleControl').value !== undefined
    && this.formulaireValidation.get('physiqueTailleControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('physiqueCouleurPeauControl').value !== undefined
    && this.formulaireValidation.get('physiqueCouleurPeauControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('physiqueCouleurCheveuControl').value !== undefined
    && this.formulaireValidation.get('physiqueCouleurCheveuControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }


    if (this.formulaireValidation.get('physiqueCouleurYeuxControl').value !== undefined
    && this.formulaireValidation.get('physiqueCouleurYeuxControl').value !== '') {
    } else {
       this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('preferenceGenreControl').value !== undefined
    && this.formulaireValidation.get('preferenceGenreControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('preferenceTailleControl').value !== undefined
    && this.formulaireValidation.get('preferenceTailleControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('preferenceCouleurPeauControl').value !== undefined
    && this.formulaireValidation.get('preferenceCouleurPeauControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }

    if (this.formulaireValidation.get('preferenceCouleurCheveuControl').value !== undefined
    && this.formulaireValidation.get('preferenceCouleurCheveuControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }


    if (this.formulaireValidation.get('preferenceCouleurYeuxControl').value !== undefined
    && this.formulaireValidation.get('preferenceCouleurYeuxControl').value !== '') {
    } else {
      this.erreurValidation = 1;
    }



    if (this.erreurValidation === 1) {
      return null;
    }




    this.httpClient
      // tslint:disable-next-line: max-line-length
      .post('http://localhost:3000/auth/inscription', {
        pseudo: this.formulaireValidation.get('pseudo').value,
        email: this.formulaireValidation.get('email').value,
        motDePasse: this.formulaireValidation.get('motDePasseGroupe').get('motDePasse').value,
        physiqueGenre: this.formulaireValidation.get('physiqueGenreControl').value.nom,
        physiqueTaille: this.formulaireValidation.get('physiqueTailleControl').value.nom,
        physiqueCouleurPeau: this.formulaireValidation.get('physiqueCouleurPeauControl').value.nom,
        physiqueCouleurCheveu: this.formulaireValidation.get('physiqueCouleurCheveuControl').value.nom,
        physiqueCouleurYeux: this.formulaireValidation.get('physiqueCouleurYeuxControl').value.nom,
        preferenceGenre: this.formulaireValidation.get('preferenceGenreControl').value.nom,
        preferenceTaille: this.formulaireValidation.get('preferenceTailleControl').value.nom,
        preferenceCouleurPeau: this.formulaireValidation.get('preferenceCouleurPeauControl').value.nom,
        preferenceCouleurCheveu: this.formulaireValidation.get('preferenceCouleurCheveuControl').value.nom,
        preferenceCouleurYeux: this.formulaireValidation.get('preferenceCouleurYeuxControl').value.nom,
        photoDeProfilEncodeBase64: this.imageEncodeBase64
      })
      .subscribe(
        (res) => {
          console.log('Enregistrement d\'un nouvel utilisateur');
          this.creationUtilisateur = 1;
        },
        (error) => {
          console.log('Erreur:' + error.error.message);
          this.messageErreur = error.error.message;
          this.creationUtilisateur = 0;


        }
      );



  }


}
