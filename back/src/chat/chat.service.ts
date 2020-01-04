import { Injectable, Query } from '@nestjs/common';
import { Repository, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatModule } from './chat.module';
import { stringLiteral } from '@babel/types';

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Chat, 'discussionBDD')
        private chatRepository: Repository<Chat>,
    ) { }


    async getNomsInterlocuteurByPseudo(pseudoSource: string): Promise<any> {
        let tableauNomsInterlocuteurs = [];
        for (let i = 0; i < (await this.chatRepository.find({ pseudoSource })).length; i++) {
            tableauNomsInterlocuteurs.push((await this.chatRepository.find({ pseudoSource }))[i].pseudoDest);
        }
        let pseudoDest = pseudoSource;
        for (let i = 0; i < (await this.chatRepository.find({ pseudoDest })).length; i++) {
            if (tableauNomsInterlocuteurs.indexOf((await this.chatRepository.find({ pseudoDest }))[i].pseudoSource) < 0) {
                tableauNomsInterlocuteurs.push((await this.chatRepository.find({ pseudoDest }))[i].pseudoSource);
            }
        }
        return tableauNomsInterlocuteurs;
    }

    async getDiscussionBySourceEtDest(pseudoSource: string, pseudoDest: string): Promise<Chat> {
        return (await this.chatRepository.find({ pseudoSource, pseudoDest }))[0];
    }

    async creerDiscussion(discussion: Chat): Promise<Chat> {

        return this.chatRepository.save(discussion);
    }


    async ajouterMessageDansDiscussion(
        pseudoSource: string,
        pseudoDest: string,
        nouveauMessageTexte: string,
        nouveauMessageDate: string): Promise<Chat> {

        // return this.chatRepository.save(discussion);

        // return this.chatRepository.update(discussion.id, discussion);
        console.log('DÉBUT Message\npseudoSource' + pseudoSource);
        console.log('pseudoDest=' + pseudoDest);
        console.log('nouveauMessageTexte=' + nouveauMessageTexte);
        console.log('nouveauMessageDate=' + nouveauMessageDate);


        let discussion = await this.getDiscussionBySourceEtDest(pseudoSource, pseudoDest); // await this.chatRepository.findOne(1);


        let messageEnregistrementDate = [];
        messageEnregistrementDate[0] = 'rien';

        messageEnregistrementDate[1] = discussion.message1Date;
        messageEnregistrementDate[2] = discussion.message2Date;
        messageEnregistrementDate[3] = discussion.message3Date;
        messageEnregistrementDate[4] = discussion.message4Date;
        messageEnregistrementDate[5] = discussion.message5Date;
        messageEnregistrementDate[6] = discussion.message6Date;
        messageEnregistrementDate[7] = discussion.message7Date;
        messageEnregistrementDate[8] = discussion.message8Date;
        messageEnregistrementDate[9] = discussion.message9Date;
        messageEnregistrementDate[10] = discussion.message10Date;

        let placeAPrendre = 0;
        for (let i = 1; i < 11; i++) {

            if (i === 1) {
                if (messageEnregistrementDate[i] === 'null') {
                    placeAPrendre = 1;
                }
            }

            if (i !== 1 && messageEnregistrementDate[i] === 'null' && messageEnregistrementDate[i - 1] !== 'null') {
                placeAPrendre = i;
            }

            if (i === 10 && placeAPrendre === 0) {
                placeAPrendre = 11;
                /*messageEnregistrementDate[1] = messageEnregistrementDate[2];
                messageEnregistrementDate[2] = messageEnregistrementDate[3];
                messageEnregistrementDate[3] = messageEnregistrementDate[4];
                messageEnregistrementDate[4] = messageEnregistrementDate[5];
                messageEnregistrementDate[5] = messageEnregistrementDate[6];
                messageEnregistrementDate[6] = messageEnregistrementDate[7];
                messageEnregistrementDate[7] = messageEnregistrementDate[8];
                messageEnregistrementDate[8] = messageEnregistrementDate[9];
                messageEnregistrementDate[9] = messageEnregistrementDate[10];
                messageEnregistrementDate[10] = 'null';
                i = 1;*/
            }
        }



        if (placeAPrendre === 1) {
            discussion.message1Texte = nouveauMessageTexte;
            discussion.message1Date = nouveauMessageDate;
        }

        if (placeAPrendre === 2) {
            discussion.message2Texte = nouveauMessageTexte;
            discussion.message2Date = nouveauMessageDate;
        }

        if (placeAPrendre === 3) {
            discussion.message3Texte = nouveauMessageTexte;
            discussion.message3Date = nouveauMessageDate;
        }

        if (placeAPrendre === 4) {
            discussion.message4Texte = nouveauMessageTexte;
            discussion.message4Date = nouveauMessageDate;
        }

        if (placeAPrendre === 5) {
            discussion.message5Texte = nouveauMessageTexte;
            discussion.message5Date = nouveauMessageDate;
        }

        if (placeAPrendre === 6) {
            discussion.message6Texte = nouveauMessageTexte;
            discussion.message6Date = nouveauMessageDate;
        }

        if (placeAPrendre === 7) {
            discussion.message7Texte = nouveauMessageTexte;
            discussion.message7Date = nouveauMessageDate;
        }

        if (placeAPrendre === 8) {
            discussion.message8Texte = nouveauMessageTexte;
            discussion.message8Date = nouveauMessageDate;
        }

        if (placeAPrendre === 9) {
            discussion.message9Texte = nouveauMessageTexte;
            discussion.message9Date = nouveauMessageDate;
        }

        if (placeAPrendre === 10) {
            discussion.message10Texte = nouveauMessageTexte;
            discussion.message10Date = nouveauMessageDate;
        }


        if (placeAPrendre === 11) {
            discussion.message1Texte = discussion.message2Texte;
            discussion.message1Date = discussion.message2Date;
            discussion.message2Texte = discussion.message3Texte;
            discussion.message2Date = discussion.message3Date;
            discussion.message3Texte = discussion.message4Texte;
            discussion.message3Date = discussion.message4Date;
            discussion.message4Texte = discussion.message5Texte;
            discussion.message4Date = discussion.message5Date;
            discussion.message5Texte = discussion.message6Texte;
            discussion.message5Date = discussion.message6Date;
            discussion.message6Texte = discussion.message7Texte;
            discussion.message6Date = discussion.message7Date;
            discussion.message7Texte = discussion.message8Texte;
            discussion.message7Date = discussion.message8Date;
            discussion.message8Texte = discussion.message9Texte;
            discussion.message8Date = discussion.message9Date;
            discussion.message9Texte = discussion.message10Texte;
            discussion.message9Date = discussion.message10Date;

            discussion.message10Texte = nouveauMessageTexte;
            discussion.message10Date = nouveauMessageDate;
        }




        return await this.chatRepository.save(discussion);



    }


}
