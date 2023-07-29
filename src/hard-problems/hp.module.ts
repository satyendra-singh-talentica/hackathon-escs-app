import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HardProblems } from './hp.entity';
import { HpsService } from './hp.service';
import { TechModule } from 'src/tech/tech.module';
import { HpsController } from './hp.controller';

@Module({
    imports: [TypeOrmModule.forFeature([HardProblems]), TechModule],
    controllers: [HpsController],
    providers: [HpsService],
    exports: [HpsService]
})
export class HpsModule { }