import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Signin } from './signin.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class SigninService {
    constructor(
        @InjectRepository(Signin)
        private signinRepository: Repository<Signin>,
    ) { }

    async  findAll(): Promise<Signin[]> {
        return await this.signinRepository.find();
    }

    async  create(signin: Signin): Promise<Signin> {
        return await this.signinRepository.save(signin);
    }

    async update(signin: Signin): Promise<UpdateResult> {
        return await this.signinRepository.update(signin.id, signin);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.signinRepository.delete(id);
    }

}
