import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tech } from './tech.entity';
import { CreateOrUpdateTechDto } from './dto/create-or-update-tech.dto';

@Injectable()
export class TechService {

    constructor(
        @InjectRepository(Tech)
        private techRepo: Repository<Tech>,
    ) { }

    createTech(dto: CreateOrUpdateTechDto) {
        const { name } = dto;
        const newTech = new Tech();
        newTech.name = name;
        return this.techRepo.save(newTech);
    }

    createTechs(data: string[]) {
        const techs = data.map(t => {
            const newTech = new Tech();
            newTech.name = t;
            return newTech;
        });
        return this.techRepo.save(techs);
    }

    getTech() {
        return this.techRepo.find();
    }
}
