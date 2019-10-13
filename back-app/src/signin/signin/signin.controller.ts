import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Signin } from '../signin.entity';
import { SigninService } from '../signin.service';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('signin')
export class SigninController {
  constructor(private signinService: SigninService){}

    @Get()
    index(): Promise<Signin[]> {
      return this.signinService.findAll();
    }

    @Post('create')
    async create(@Body() signinData: Signin): Promise<any> {
      return this.signinService.create(signinData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() signinData: Signin): Promise<any> {
        signinData.id = Number(id);
        console.log('Update #' + signinData.id)
        return this.signinService.update(signinData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.signinService.delete(id);
    }

}
