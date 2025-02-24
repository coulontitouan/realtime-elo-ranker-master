import { HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Ranking, RankingUpdateEvent } from 'src/app.types';
import { PlayerService } from 'src/player/player.service';
export declare class RankingService extends AppService {
    private playerService;
    constructor(playerService: PlayerService);
    getRanking(): Promise<Ranking | HttpStatus.NOT_FOUND>;
    emitRankingUpdate(event: RankingUpdateEvent): void;
}
