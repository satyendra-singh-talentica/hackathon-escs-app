import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tech } from './tech.entity';

@Injectable()
export class TechService {

    constructor(
        @InjectRepository(Tech)
        private techRepo: Repository<Tech>,
    ) { }

    createTech(dto) {
        const { name } = dto;
        const newTech = new Tech();
        newTech.name = name;
        return this.techRepo.save(newTech);
    }

    getTech() {
        return this.techRepo.find();
    }

}
