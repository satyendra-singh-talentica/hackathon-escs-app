import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { BaseEntity } from '../entity/base.entity';

@Entity()
export class Tech extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    // relations
}