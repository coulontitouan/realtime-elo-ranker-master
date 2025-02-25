import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class PlayerDB {
    @PrimaryColumn()
    id: string;

    @Column({ default: 0 })
    rank: number;
}