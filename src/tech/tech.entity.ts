import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

import { BaseEntity } from '../entity/base.entity';

@Entity()
@Unique('UQ_tech_name', ['name'])
export class Tech extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    // relations
}