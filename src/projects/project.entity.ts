import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../entity/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    client: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ type: 'text', array: true, nullable: true })
    tech: string[];

    @Column({ type: 'tsvector', nullable: true, select: false })
    tsv: string;

    @Column()
    userId: number;

    // relations
    @ManyToOne(() => User, (user) => user.projects)
    user: User;
}