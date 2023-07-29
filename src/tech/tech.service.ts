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

    createTechs(data) {
        const allTech = [];
        data.forEach(p => {
            p["Tech"].split(",").map(x => x.trim()).map(x => x.toLowerCase()).forEach(t => {
                allTech.push(t)
            });
        });
        const dt = [...new Set(allTech)];
        const techs = dt.map(t => {
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
