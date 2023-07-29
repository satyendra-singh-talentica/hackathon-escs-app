import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects/project.service';
import { HpsService } from './hard-problems/hp.service';

@Injectable()
export class AppService {

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly hpsService: HpsService,
  ) { }

  async search(searchString: string) {
    const projects = await this.projectsService.searchProjects(searchString);
    const hps = await this.hpsService.searchHps(searchString);
    return {
      projects,
      hps,
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
