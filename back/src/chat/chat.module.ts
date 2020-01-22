import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    //imports: [ChatService],
    // providers: [ ChatGateway, ChatService ],
    imports: [
        TypeOrmModule.forFeature([Chat], 'discussionBDD'),
        TypeOrmModule.forFeature([Message], 'discussionBDD'),
      ],
    providers: [ChatService, ChatGateway],
    controllers: [ChatController],
    exports: [ ChatModule ],
  })
export class ChatModule {}
