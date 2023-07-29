import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectsService } from './project.service';

@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects(@Query() dto) {
    return this.projectsService.getProjects(dto);
  }

  @Get(':id')
  getProject(@Param('id') projectId: number) {
    return this.projectsService.getProject(projectId);
  }

  @Post()
  createProjects(@Body() data) {
    return this.projectsService.createProjects(data);
  }
}
