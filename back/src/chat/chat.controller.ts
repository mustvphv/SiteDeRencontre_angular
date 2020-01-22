import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body, NotFoundException, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Controller('chat')
export class ChatController {
  constructor(
      private readonly chatService: ChatService) {}

  @Post('enregistrementMessages')
  async enregistrementDiscussion(@Response() res: any, @Body() bodyDiscussion: Chat, @Body() bodyMessage: Message) {
    if (!(bodyDiscussion && bodyDiscussion.pseudoSource && bodyDiscussion.pseudoDest
      && bodyMessage.messageDate && bodyMessage.messageTexte)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Le message manque d\'élément.' });
    }

    let discussion = await this.chatService.getDiscussionBySourceEtDest(bodyDiscussion.pseudoSource, bodyDiscussion.pseudoDest);

    if (discussion) {
      let message = await this.chatService.ajouterMessageDansDiscussion(
        bodyDiscussion.pseudoSource,
        bodyDiscussion.pseudoDest,
        bodyMessage.messageTexte,
        bodyMessage.messageDate);
    } else {
        discussion = await this.chatService.creerDiscussion(bodyDiscussion);
        let messsage = await this.chatService.ajouterMessageDansDiscussion(
          bodyDiscussion.pseudoSource,
          bodyDiscussion.pseudoDest,
          bodyMessage.messageTexte,
          bodyMessage.messageDate);
    }
  }

  @Get('historiqueMessages/:pseudoSource/:pseudoDest')
  async recuperationHistoriqueMessage(@Param('pseudoSource') pseudoSource: string, @Param('pseudoDest') pseudoDest: string) {
    let discussion1Id = -1;
    let discussion2Id = -1;

    if ((await this.chatService.getDiscussionBySourceEtDest(pseudoSource, pseudoDest)) !== undefined) {
        discussion1Id = (await this.chatService.getDiscussionBySourceEtDest(pseudoSource, pseudoDest)).id;
    }

    if ((await this.chatService.getDiscussionBySourceEtDest(pseudoDest, pseudoSource)) !== undefined) {
        discussion2Id = (await this.chatService.getDiscussionBySourceEtDest(pseudoDest, pseudoSource)).id;
    }

    const messagesBDD1 = await this.chatService.getMessagesByDiscussionId(discussion1Id);
    const messagesBDD2 = await this.chatService.getMessagesByDiscussionId(discussion2Id);

    return [messagesBDD1, messagesBDD2];
  }


  @Get('historiqueDiscussions/:pseudo')
  async recuperationHistoriqueDiscussions(@Param('pseudo') pseudo: string) {
    const discussionsHisto = await this.chatService.getNomsInterlocuteurByPseudo(pseudo);

    return discussionsHisto;
  }

}
