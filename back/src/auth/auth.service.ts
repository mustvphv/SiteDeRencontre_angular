import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { SigninService } from '../signin/signin.service';

@Injectable()
export class AuthService {
  constructor(private readonly signinService: SigninService) { }

  async creerToken(id: number, pseudo: string) {
    const expiresIn = 180;
    const secretOrKey = 'cleprive5788bonjourchocolat';
    const utilisateur = { pseudo };
    const token = jwt.sign(utilisateur, secretOrKey, { expiresIn });

    return { expire_dans: expiresIn, token };
  }

  async validationUtilisateurCourant(utilisateurVoulantSeConnecter): Promise<boolean> {
    if (utilisateurVoulantSeConnecter && utilisateurVoulantSeConnecter.pseudo) {
      return Boolean(this.signinService.getUtilisateurByPseudo(utilisateurVoulantSeConnecter.pseudo));
    }

    return false;
  }
}
