import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,
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
