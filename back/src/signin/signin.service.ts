import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Signin } from './signin.entity';
// import { UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SigninService {
    private saltRajout = 10;

    constructor(
        @InjectRepository(Signin)
        private signinRepository: Repository<Signin>,
    ) { }

    async findAll(): Promise<Signin[]> {
        return await this.signinRepository.find();
    }

    async getUtilisateurByPseudo(pseudo: string): Promise<Signin> {
        return (await this.signinRepository.find({ pseudo }))[0];
    }

    async getUtilisateurByEmail(email: string): Promise<Signin> {
        return (await this.signinRepository.find({ email }))[0];
    }

    async getUtilisateurInformations(pseudo: string): Promise<Signin> {
        return (await this.signinRepository.find({ pseudo }))[0];
    }


    async creerUtilisateur(utilisateur: Signin): Promise<Signin> {
        utilisateur.motDePasseHash = await this.getHash(utilisateur.motDePasse);

        utilisateur.motDePasse = undefined;
        return this.signinRepository.save(utilisateur);
    }

    async getHash(motDePasse: string|undefined): Promise<string> {
        return bcrypt.hash(motDePasse, this.saltRajout);
    }

    async compareHash(motDePasse: string|undefined, hash: string|undefined): Promise<boolean> {
        return bcrypt.compare(motDePasse, hash);
      }
    /*
    async update(signin: Signin): Promise<UpdateResult> {
        return await this.signinRepository.update(signin.id, signin);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.signinRepository.delete(id);
    }*/

}
