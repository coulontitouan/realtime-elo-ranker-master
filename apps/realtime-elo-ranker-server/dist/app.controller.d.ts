import { AppService } from './app.service';
import { MatchResult, Player, PublishedMatch, Ranking, RankingUpdateEvent } from './app.types';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AppController {
    private readonly appService;
    private eventEmitter;
    private rankingUpdates$;
    constructor(appService: AppService, eventEmitter: EventEmitter2);
    createMatch(match: MatchResult): PublishedMatch;
    createPlayer(player: {
        id: string;
    }): Player;
    getRanking(): Ranking;
    getRankingEvents(): Observable<{
        data: string;
    }>;
    handleRankingUpdate(event: RankingUpdateEvent): void;
}
