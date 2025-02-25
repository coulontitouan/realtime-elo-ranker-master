import { HttpStatus } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppService } from '../app.service';
import { PlayerScratch, Player } from '../app.types';
import { FindManyOptions, Repository } from 'typeorm';
import { PlayerDB } from './player.entity';
export declare class PlayerService extends AppService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<PlayerDB>, eventEmitter: EventEmitter2);
    createPlayer(player: PlayerScratch): Promise<Player | HttpStatus>;
    updatePlayer(player: Player): Promise<Player | HttpStatus.NOT_FOUND>;
    getPlayer(player: Player | PlayerScratch): Promise<Player | HttpStatus.NOT_FOUND>;
    deletePlayer(player: Player | PlayerScratch): Promise<Player | HttpStatus.NOT_FOUND>;
    getPlayers(options?: FindManyOptions<PlayerDB>): Promise<Player[]>;
}
