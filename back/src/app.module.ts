import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SigninModule } from './signin/signin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [SigninModule,
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/signin/*.entity{.ts,.js}'],
    synchronize: true,
 }),
 TypeOrmModule.forRoot({
  name: 'discussionBDD',
  type: 'sqlite',
  database: 'db_messagerie.sqlite',
  entities: [__dirname + '/chat/*.entity{.ts,.js}'],
  synchronize: true,
}), AuthModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
