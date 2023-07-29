import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

    async createTechs(data: string[]) {
        const dbTechs = await this.techRepo.find({ where: { name: In(data) } });
        const dbTechNames = dbTechs.map(d => d.name);
        const newTechs = [];
        data.forEach(t => {
            if (!dbTechNames.includes(t)) {
                const newTech = new Tech();
                newTech.name = t;
                newTechs.push(newTech);
            }
        });
        return this.techRepo.save(newTechs);
    }

    getTech() {
        return this.techRepo.find();
    }
}
