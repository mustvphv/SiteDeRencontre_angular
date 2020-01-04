import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ChatService } from '../chat.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  formulaireMessage: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private chatService: ChatService,
    private fb: FormBuilder,
    private socket: Socket) { }

  pseudo: string;
  pseudo2: string;
  infos = [];
  infosUtilisateurCourant: any;
  slides = [];
  connecte = 1;
  chargementHistoriqueMessages = 0;


  messages = [];
  historiqueBDD1 = [];
  historiqueBDD2 = [];
  messagesBDD = [];
  message = {texte: '', source: '', date: ''};

  valeurF(messageServeur) {
    let message = [];
    for (let cle in messageServeur ){
        if (messageServeur.hasOwnProperty(cle)) {
            message[cle] = messageServeur[cle];
        }
    }
    return message;
}

  ngOnInit() {
    localStorage.setItem('discussion', 'DejaUneDiscussion');

    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));

    this.pseudo = this.route.snapshot.paramMap.get('utilisateur1');
    this.pseudo2 = this.route.snapshot.paramMap.get('utilisateur2');

    this.formulaireMessage = this.fb.group({
      message_ecriture: ['', [Validators.required]]
    });


    if (this.chargementHistoriqueMessages === 0) {
        this.httpClient.get(`http://localhost:3000/chat/historiqueMessages/${this.pseudo}/${this.pseudo2}`, { headers: new HttpHeaders({
          'Authorization': `Bearer ${valeurAuthToken}`,
          'Content-Type': 'application/json',
        }) } )
        // .pipe(takeLast(1))
        .subscribe((data: any) => {

          if (data[0] != null) {

          let tempTexte = [data[0].message1Texte, data[0].message2Texte, data[0].message3Texte, data[0].message4Texte,
            data[0].message5Texte, data[0].message6Texte, data[0].message7Texte, data[0].message8Texte, data[0].message9Texte, data[0].message10Texte];

          let tempDate = [data[0].message1Date, data[0].message2Date, data[0].message3TexteDate, data[0].message4Date,
            data[0].message5Date, data[0].message6Date, data[0].message7Date, data[0].message8Date,
            data[0].message9Date, data[0].message10Date];

          for (let i = 0; i < 10; i++) {
            if (tempDate[i] !== 'null' && tempDate[i] != null) {
                let messageBDD1 = {texte: '', source: '', date: ''};
                messageBDD1.texte = JSON.parse(JSON.stringify(tempTexte[i]));
                messageBDD1.source = this.pseudo;
                messageBDD1.date = JSON.parse(JSON.stringify(tempDate[i]));
                this.messagesBDD.push(messageBDD1);
            }
          }

          }

          if (data[1] != null) {

          let tempTexte2 = [data[1].message1Texte, data[1].message2Texte, data[1].message3Texte, data[1].message4Texte,
            data[1].message5Texte, data[1].message6Texte, data[1].message7Texte, data[1].message8Texte,
            data[1].message9Texte, data[1].message10Texte];

          let tempDate2 = [data[1].message1Date, data[1].message2Date, data[1].message3TexteDate, data[1].message4Date,
            data[1].message5Date, data[1].message6Date, data[1].message7Date, data[1].message8Date,
            data[1].message9Date, data[1].message10Date];

          for (let i = 0; i < 10; i++) {
            if (tempDate2[i] !== 'null' && tempDate2[i] != null) {
                let messageBDD2 = {texte: '', source: '', date: ''};
                messageBDD2.texte = JSON.parse(JSON.stringify(tempTexte2[i]));
                messageBDD2.source = this.pseudo2;
                messageBDD2.date = JSON.parse(JSON.stringify(tempDate2[i]));
                this.messagesBDD.push(messageBDD2);
            }
          }

          }


          if (this.messagesBDD.length > 1) {
            let changements = 0;
            while (changements > -1) {
            changements = 0;
            for (let i = 0; i < this.messagesBDD.length - 1; i++) {
              let date1 = new Date(this.messagesBDD[i].date.split('|')[0]);
              let date2 = new Date(this.messagesBDD[i + 1].date.split('|')[0]);
              //console.log('date1getTime' + date1.getTime());
              // console.log('date2getTime' + date2.getTime());
              if (date1.getTime() > date2.getTime()) {
                  let tmp = this.messagesBDD[i];
                  this.messagesBDD[i] = this.messagesBDD[i + 1];
                  this.messagesBDD[i + 1] = tmp;
                  changements ++;
              }
            }
            if (changements === 0) {
                changements = -1;
            }
            }
          }

          for (let i = 0; i < this.messagesBDD.length; i++) {
            this.messagesBDD[i].date = this.messagesBDD[i].date.split('|')[1];

            this.messages.push(this.messagesBDD[i]);
          }




        }, err => {} );


        this.chargementHistoriqueMessages = 1;
    }


    this.connecteOuDeconnecte();

    this.chatService.rejoindreChat(this.pseudo);

    this.socket.on('messageRoom' + this.pseudo, message => {

      if (this.connecte === 1) {

      this.message.texte = message.texte;
      this.message.source = message.source;
      this.message.date = message.date;

      this.messages.push(this.valeurF(this.message));
      for (let it = 0; it < this.messages.length; it++) {
        // console.log('messages' + this.messages[it].texte);
      }


      if (this.message.source === this.pseudo) {

      console.log('post du message =' + this.message.texte + this.message.source + this.pseudo);




      this.httpClient
      .post('http://localhost:3000/chat/enregistrementMessages', {
        pseudoSource: this.pseudo,
        pseudoDest: this.pseudo2,
        message1Texte: this.message.texte,
        message1Date: this.message.date,
        message2Texte: 'null',
        message2Date: 'null',
        message3Texte: 'null',
        message3Date: 'null',
        message4Texte: 'null',
        message4Date: 'null',
        message5Texte: 'null',
        message5Date: 'null',
        message6Texte: 'null',
        message6Date: 'null',
        message7Texte: 'null',
        message7Date: 'null',
        message8Texte: 'null',
        message8Date: 'null',
        message9Texte: 'null',
        message9Date: 'null',
        message10Texte: 'null',
        message10Date: 'null'
      })
      .pipe(
        timeout(2000),
        catchError(e => {
          // console.log('timeout');
          return of(null);
        })
      )
      .subscribe(
        (res) => {
          console.log('Enregistrement d\'un nouveau message');
        },
        (error) => {
          console.log('Erreur:' + error.error.message);
        }
      );

      }

      }

    });

    this.socket.on('changementUtilisateur', (data) => {
      const user = data['user'];

    });


  }

  connecteOuDeconnecte() {
    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));

    this.pseudo = this.route.snapshot.paramMap.get('utilisateur1');
    this.pseudo2 = this.route.snapshot.paramMap.get('utilisateur2');

    this.httpClient.get(`http://localhost:3000/auth/informationsUtilisateur/${this.pseudo}`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } ).subscribe((data: any) => {
      this.infos = JSON.parse(JSON.stringify(data.pseudo));
      this.connecte = 1;



    }, err => {
      this.connecte = 0;
      localStorage.removeItem('auth_token');
      this.router.navigate(['/connexion_page_acceuil']);
    } );
  }


  envoiMessage() {

    let valeurAuthToken = JSON.parse(JSON.stringify(localStorage.getItem('auth_token')));

    this.pseudo = this.route.snapshot.paramMap.get('utilisateur1');
/*
    this.httpClient.get(`http://localhost:3000/auth/informationsUtilisateur/${this.pseudo}`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } ).subscribe((data: any) => {
      this.infos = JSON.parse(JSON.stringify(data.pseudo));
      this.connecte = 1;*/

    this.socket.emit('ajoutMessage', { texte: this.formulaireMessage.get('message_ecriture').value, source: this.pseudo, destinataire: this.pseudo2 });
    this.formulaireMessage.get('message_ecriture').reset();
    this.message.texte = '';
    this.message.source = '';
    this.message.date = '';

/*
    }, err => {
      this.connecte = 0;
      localStorage.removeItem('auth_token');
      this.router.navigate(['/connexion_page_acceuil']);
    } );*/




    // this.message.texte = this.formulaireMessage.get('message_ecriture').value;




  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }


}
