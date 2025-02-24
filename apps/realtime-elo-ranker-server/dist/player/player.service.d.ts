import { HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PlayerScratch, Player } from 'src/app.types';
import { PlayerDB } from 'src/entities/Player.entity';
import { FindManyOptions, Repository } from 'typeorm';
export declare class PlayerService extends AppService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<PlayerDB>);
    createPlayer(player: PlayerScratch): Promise<Player | HttpStatus>;
    updatePlayer(player: Player): Promise<Player | HttpStatus.NOT_FOUND>;
    getPlayer(player: Player | PlayerScratch): Promise<Player | HttpStatus.NOT_FOUND>;
    getPlayers(options?: FindManyOptions<PlayerDB>): Promise<Player[]>;
}
