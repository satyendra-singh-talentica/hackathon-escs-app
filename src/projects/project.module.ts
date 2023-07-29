import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';
import { TechModule } from 'src/tech/tech.module';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), TechModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule { }