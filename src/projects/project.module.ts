import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule { }