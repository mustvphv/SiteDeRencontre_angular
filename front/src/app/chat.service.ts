import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket,
    private httpClient: HttpClient) {

  }

  rejoindreChat(nickname) {

    this.socket.connect();



    //let room = 'Room' + nickname + '&' + nickname2;
    let room = 'Room' + nickname;

    this.socket.emit('room', room);

  }

/*
  async recupererDonneesHistorique(pseudo: string, pseudo2: string, valeurAuthToken: string): Promise<any> {
    return this.httpClient.get(`http://localhost:3000/chat/historiqueMessages/${pseudo}/${pseudo2}`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${valeurAuthToken}`,
      'Content-Type': 'application/json',
    }) } )
    .pipe(map((data: any) => {

      return data.toPromise();



    }, err => {} ));
  }*/



}