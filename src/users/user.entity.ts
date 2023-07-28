import { PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';

import { BaseEntity } from '../entity/base.entity';
import { Project } from '../projects/project.entity';

@Entity()
@Unique('UQ_user_employeeId', ['employeeId'])
@Unique('UQ_user_email', ['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: number;

    @Column({ type: 'text' })
    name: string;
    
    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ nullable: true })
    gender: number;

    @Column({ type: 'text' })
    designation: string;

    @Column({ type: 'text', nullable: true })
    github: string;

    @Column()
    dateOfJoining: Date;

    @Column({ nullable: true })
    dateOfBirth: Date;

    // relations
    @OneToMany(() => Project, (projects) => projects.user)
    projects: Project[];
}