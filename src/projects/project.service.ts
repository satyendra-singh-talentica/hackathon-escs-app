import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateOrUpdateProjectDto } from './dto/create-or-update-project.dto';
import { TechService } from 'src/tech/tech.service';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,

        private readonly techService: TechService,
    ) { }

    createProjects(data) {
        const allTech = [];
        const projects = data.map(p => {
            const newProject = new Project();
            newProject.userId = parseInt(p["UserId"], 10);
            newProject.name = p["Name"];
            newProject.client = p["Client"];
            newProject.description = p["Desc"];
            newProject.startDate = new Date(p["Start"]);
            newProject.endDate = new Date(p["End"]);
            const tech = p["Tech"].split(",").map(x => x.trim()).map(x => x.toLowerCase());
            newProject.tech = tech;
            allTech.concat(...tech);
            return newProject;
        });
        console.log([...new Set(allTech)]);
        return this.projectRepo.save(projects);
    }

    async createProject(data: CreateOrUpdateProjectDto) {
        const newProject = new Project();
        newProject.userId = data.userId;
        newProject.name = data.name;
        newProject.client = data.client;
        newProject.description = data.description;
        newProject.startDate = data.startDate;
        newProject.endDate = data.endDate;
        const techs = data.tech.split(",").map(x => x.trim()).map(x => x.toLowerCase());
        await this.techService.createTechs(techs);
        newProject.tech = techs;
        return this.projectRepo.save(newProject);
    }

    getProjects(dto) {
        return this.projectRepo.find({ where: dto, order: { createdAt: 'DESC' } });
    }

    getProject(projectId: number) {
        return this.projectRepo.findOne({ where: { id: projectId }, relations: { user: true } });
    }

    searchProjects(searchString: string) {
        const selectFields = [
            'id',
            'name',
            'client',
            'description',
            'tech',
        ];
        return this.projectRepo.query(`SELECT ${selectFields.join()} FROM (
            SELECT * FROM public.project, plainto_tsquery($1) AS q WHERE (tsv @@ q)
        ) AS t1 ORDER BY ts_rank_cd(t1.tsv, q) DESC`, [searchString]);
    }
}
