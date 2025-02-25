import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class PlayerDB {
    @PrimaryColumn()
    id: string;

    @Column({ default: 1000 })
    rank: number;
}