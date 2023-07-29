import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects/project.service';

@Injectable()
export class AppService {

  constructor(private readonly projectsService: ProjectsService) { }

  async search(searchString: string) {
    const projects = await this.projectsService.searchProjects(searchString);
    return {
      projects
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
