import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body, NotFoundException, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(
      private readonly chatService: ChatService) {}

  @Post('enregistrementMessages')
  async enregistrementDiscussion(@Response() res: any, @Body() body: Chat) {
    if (!(body && body.pseudoSource && body.pseudoDest
      && body.message1Texte && body.message1Date
      && body.message2Texte && body.message2Date
      && body.message3Texte && body.message3Date
      && body.message4Texte && body.message4Date
      && body.message5Texte && body.message5Date
      && body.message6Texte && body.message6Date
      && body.message7Texte && body.message7Date
      && body.message8Texte && body.message8Date
      && body.message9Texte && body.message9Date
      && body.message10Texte && body.message10Date)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Le message manque d\'élément.' });
    }

    let discussion = await this.chatService.getDiscussionBySourceEtDest(body.pseudoSource, body.pseudoDest);

    if (discussion) {
      this.chatService.ajouterMessageDansDiscussion(
        body.pseudoSource,
        body.pseudoDest,
        body.message1Texte,
        body.message1Date);
    } else {
        discussion = await this.chatService.creerDiscussion(body);
    }
  }

  @Get('historiqueMessages/:pseudoSource/:pseudoDest')
  async recuperationHistoriqueMessage(@Param('pseudoSource') pseudoSource: string, @Param('pseudoDest') pseudoDest: string) {
    const messagesBDD1 = await this.chatService.getDiscussionBySourceEtDest(pseudoSource, pseudoDest);
    const messagesBDD2 = await this.chatService.getDiscussionBySourceEtDest(pseudoDest, pseudoSource);

    return [messagesBDD1, messagesBDD2];
  }


  @Get('historiqueDiscussions/:pseudo')
  async recuperationHistoriqueDiscussions(@Param('pseudo') pseudo: string) {
    const discussionsHisto = await this.chatService.getNomsInterlocuteurByPseudo(pseudo);

    return discussionsHisto;
  }

}
