import { HttpStatus } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppService } from '../app.service';
import { Ranking, RankingUpdateEvent } from '../app.types';
import { PlayerService } from '../player/player.service';
export declare class RankingService extends AppService {
    private playerService;
    constructor(playerService: PlayerService, eventEmitter: EventEmitter2);
    getRanking(): Promise<Ranking | HttpStatus.NOT_FOUND>;
    emitRankingUpdate(event: RankingUpdateEvent): void;
}
