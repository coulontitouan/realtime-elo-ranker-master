import { PlayerScratch, Player } from 'src/app.types';
import { PlayerService } from './player.service';
export declare class PlayerController {
    private playerService;
    constructor(playerService: PlayerService);
    getPlayer(id: string): Promise<Player>;
    createPlayer(player: PlayerScratch): Promise<Player>;
}
