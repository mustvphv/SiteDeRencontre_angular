import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { SigninModule } from '../signin/signin.module';

@Module({
  imports: [SigninModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/auth/informationsUtilisateur', method: RequestMethod.ALL },
        { path: '/informationsTousLesUtilisateurs', method: RequestMethod.ALL },
        { path: '/auth/informationsUtilisateur/*', method: RequestMethod.ALL });
  }
}
