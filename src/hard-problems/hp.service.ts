import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HardProblems } from './hp.entity';
import { CreateOrUpdateHPDto } from './dto/create-or-update-hp.dto';
import { TechService } from 'src/tech/tech.service';

@Injectable()
export class HpsService {

    constructor(
        @InjectRepository(HardProblems)
        private hpRepo: Repository<HardProblems>,

        private readonly techService: TechService,
    ) { }

    async createHp(data: CreateOrUpdateHPDto) {
        const newHp = new HardProblems();
        newHp.userId = data.userId;
        newHp.name = data.name;
        newHp.description = data.description;
        newHp.doclink = data.doclink;
        const techs = data.tech.split(",").map(x => x.trim()).map(x => x.toLowerCase());
        await this.techService.createTechs(techs);
        newHp.tech = techs;
        return this.hpRepo.save(newHp);
    }

    getHp(id: number) {
        return this.hpRepo.findOne({ where: { id }, relations: { user: true } });
    }

    getHps(dto) {
        return this.hpRepo.find({ where: dto, order: { createdAt: 'DESC' } });
    }

    searchHps(searchString: string) {
        const selectFields = [
            'id',
            'name',
            'doclink',
            'description',
            'tech',
        ];
        return this.hpRepo.query(`SELECT ${selectFields.join()} FROM (
            SELECT * FROM public.hard_problems, plainto_tsquery($1) AS q WHERE (tsv @@ q)
        ) AS t1 ORDER BY ts_rank_cd(t1.tsv, q) DESC`, [searchString]);
    }
}
