import { PlayerScratch, Player } from '../app.types';
import { PlayerService } from './player.service';
export declare class PlayerController {
    private playerService;
    constructor(playerService: PlayerService);
    getPlayer(id: string): Promise<Player>;
    createPlayer(player: PlayerScratch): Promise<Player>;
    deletePlayer(id: string): Promise<Player>;
}
