import { Controller, NotFoundException, } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Signin } from '../signin.entity';
import { SigninService } from '../signin.service';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('signin')
export class SigninController {
  constructor(
    private signinService: SigninService,
    private readonly utilisateurService: SigninService) {}


/*
    @Post('inscription')
    async creerUtilisateur(@Body() signinData: Signin): Promise<any> {
      return this.signinService.creerUtilisateur(signinData);
    }*/


    /*
    @Put(':id/update')
    async update(@Param('id') id, @Body() signinData: Signin): Promise<any> {
        signinData.id = Number(id);
        // tslint:disable-next-line: no-console
        console.log('Update #' + signinData.id);
        return this.signinService.update(signinData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.signinService.delete(id);
    }*/

}
