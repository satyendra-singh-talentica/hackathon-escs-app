import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateOrUpdateProjectDto } from './dto/create-or-update-project.dto';

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
  createProject(@Body(new ValidationPipe({ transform: true })) dto: CreateOrUpdateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @Post('/bulk')
  createProjects(@Body() data) {
    return this.projectsService.createProjects(data);
  }
}
