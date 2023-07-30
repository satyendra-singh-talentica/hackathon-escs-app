import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Tech } from './tech/tech.entity';
import { TechModule } from './tech/tech.module';
import { UsersModule } from './users/user.module';
import { ProjectsModule } from './projects/project.module';
import { HpsModule } from './hard-problems/hp.module';
import { HardProblems } from './hard-problems/hp.entity';
import { ChatGPTModule } from './chatgpt/chatgpt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERANME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DBNAME,
      entities: [User, Project, Tech, HardProblems],
      synchronize: true,
    }),
    TechModule,
    UsersModule,
    ProjectsModule,
    HpsModule,
    ChatGPTModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
