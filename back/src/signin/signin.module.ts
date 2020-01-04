import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
//import { SigninController } from './signin/signin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signin } from './signin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Signin]),
  ],
  providers: [SigninService],
  //controllers: [SigninController],
  exports: [SigninService],
})
export class SigninModule {}
