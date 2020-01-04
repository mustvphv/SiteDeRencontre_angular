import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;

    pseudos: Map<string, string> = new Map();

    async handleConnection(client: Socket){


        this.users++;

        this.server.emit('users', this.users);

    }

    async handleDisconnect(client: Socket) {
        client.server.emit('changementUtilisateur', {user: this.pseudos[client.id], event: 'left'});
        this.pseudos.delete(client.id);
      }

      async getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

      @SubscribeMessage('room')
      connectionRoom(client: Socket, room: string) {

        client.join(room);
      }

      @SubscribeMessage('ajoutMessage')
      envoiMessageRoom(client: Socket, message) {

        let room = 'Room' + message.source;
        let room2 = 'Room' + message.destinataire;

        let dateJ = new Date().getDate();
        const joursDeLaSemaine = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');

        let jourDeLaSemaine = joursDeLaSemaine[new Date().getDay()];

        let dateMonth = new Date().getUTCMonth() + 1;
        let dateMonth_str = dateMonth.toString();
        let dateY = new Date().getUTCFullYear();
        let dateH = new Date().getHours();
        let dateM = new Date().getUTCMinutes();
        let dateM_str = dateM.toString();
        if (dateM < 10) {
          dateM_str = '0' + dateM_str;
        }
        if (dateMonth < 10) {
          dateMonth_str = '0' + dateMonth_str;
        }
        let dateTotale = new Date().toString() + '|' + dateH + ':' + dateM_str + ' (' + jourDeLaSemaine + ' ' + dateJ + '/' + dateMonth_str + '/' + dateY + ' )';


        this.server.to(room).emit('message' + room, {texte: message.texte, source: message.source, date: dateTotale});
        this.server.to(room2).emit('message' + room2, {texte: message.texte, source: message.source, date: dateTotale});


      }

}
