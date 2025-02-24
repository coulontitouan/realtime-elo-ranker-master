import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { Ranking, RankingUpdateEvent } from 'src/app.types';
import { RankingService } from './ranking.service';
export declare class RankingController {
    private readonly rankingService;
    private eventEmitter;
    private readonly URL;
    private rankingUpdates$;
    constructor(rankingService: RankingService, eventEmitter: EventEmitter2);
    getRanking(): Promise<Ranking>;
    getRankingEvents(): Observable<{
        data: string;
    }>;
    handleRankingUpdate(event: RankingUpdateEvent): void;
}
