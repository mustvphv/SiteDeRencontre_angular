import { Injectable, Query } from '@nestjs/common';
import { Repository, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatModule } from './chat.module';
import { stringLiteral, anyTypeAnnotation } from '@babel/types';
import { Message } from './message.entity';

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Chat, 'discussionBDD')
        private chatRepository: Repository<Chat>,

        @InjectRepository(Message, 'discussionBDD')
        private messageRepository: Repository<Message>,
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

    async getMessagesByDiscussionId(id: number): Promise<any> {
        const discussionId = id;
        let tableauMessages = [];

        for (let i = 0; i < (await this.messageRepository.find({ relations: ['discussion'] })).length; i++) {
            if ((await this.messageRepository.find({ relations: ['discussion'] }))[i].discussion.id === id) {
                tableauMessages.push((await this.messageRepository.find({ relations: ['discussion'] }))[i]);
            }
        }
        return tableauMessages;
    }

    async creerDiscussion(discussion: Chat): Promise<Chat> {

        return this.chatRepository.save(discussion);
    }



    async ajouterMessageDansDiscussion(
        pseudoSource: string,
        pseudoDest: string,
        nouveauMessageTexte: string,
        nouveauMessageDate: string): Promise<any> {

        let discussion = await this.getDiscussionBySourceEtDest(pseudoSource, pseudoDest);

        let message = new Message();

        message.discussion = discussion;
        message.messageTexte = nouveauMessageTexte;
        message.messageDate = nouveauMessageDate;



        if ((await this.messageRepository.find()).length - 1 > 0 && (await this.messageRepository.find()).length - 1 !== undefined) {
            if ((await this.messageRepository.find())[(await this.messageRepository.find()).length - 1].messageTexte === message.messageTexte
            && (await this.messageRepository.find())[(await this.messageRepository.find()).length - 1].messageDate === message.messageDate
            && (await this.messageRepository.find({ relations: ['discussion'] }))[(await this.messageRepository.find()).length - 1].discussion.id
             === message.discussion.id
            ) {
                return 0;
            }
        }

        return await this.messageRepository.save(message);

    }


}
