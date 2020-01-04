import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body, NotFoundException, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninService } from '../signin/signin.service';
import { Signin } from '../signin/signin.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilisateurService: SigninService) {}

  @Get('check_nicknames/:pseudo')
  async index(@Param('pseudo') pseudo: string) {
    const signin = await this.utilisateurService.getUtilisateurByPseudo(pseudo);
    if (!signin) {  // si le pseudo n'existe pas, alors ça retourne 404 sinon 200
      throw new NotFoundException();
    }
  }

  @Get('check_emails/:email')
  async index_email(@Param('email') email: string) {
    const signin = await this.utilisateurService.getUtilisateurByEmail(email);
    if (!signin) {
      throw new NotFoundException();
    }
  }

  @Get('informationsUtilisateur/:pseudo')
  async informationsUtilisateurFonction(@Param('pseudo') pseudo: string) {
    // const signin = await this.utilisateurService.findAll();
    const signin = await this.utilisateurService.getUtilisateurByPseudo(pseudo);
    if (!signin) {  // si le pseudo n'existe pas, alors ça retourne 404
      throw new NotFoundException();
    }
    return signin;
  }

  @Get('informationsTousLesUtilisateurs')
  async informationsTousLesUtilisateursFonction() {
    const signin = await this.utilisateurService.findAll();
    if (!signin) {
      throw new NotFoundException();
    }
    return signin;
  }



  @Post('connexion')
  async connexionUtilisateur(@Response() res: any, @Body() body: Signin) {
    if (!(body && body.pseudo && body.motDePasse)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Vous n\'avez pas mis de pseudo ou de mot de passe.' });
    }

    const utilisateur = await this.utilisateurService.getUtilisateurByPseudo(body.pseudo);

    if (utilisateur) {
      if (await this.utilisateurService.compareHash(body.motDePasse, utilisateur.motDePasseHash)) {
        return res.status(HttpStatus.OK).json(await this.authService.creerToken(utilisateur.id, utilisateur.pseudo));
      }
    }

    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Le pseudo ou le mot de passe sont erronés. Réessayez' });
  }

  @Post('inscription')
  async inscriptionUtilisateur(@Response() res: any, @Body() body: Signin) {
    if (!(body && body.pseudo && body.motDePasse)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Vous devez mettre votre pseudo et votre mot de passe.' });
    }

    let utilisateur = await this.utilisateurService.getUtilisateurByPseudo(body.pseudo);

    if (utilisateur) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Ce pseudo est déjà utilisé.' });
    } else {
      utilisateur = await this.utilisateurService.creerUtilisateur(body);
      if (utilisateur) {
        utilisateur.motDePasseHash = undefined;
      }
    }

    return res.status(HttpStatus.OK).json(utilisateur);
  }
}
