import { Player, MatchResult, PublishedMatch, Ranking, APIErrorCode, RankingUpdate, RankingUpdateEvent } from './app.types';
import { EventEmitter } from 'events';
interface EventMap {
    [RankingUpdate]: RankingUpdateEvent[];
}
export declare class AppService {
    private data;
    private eventEmitter;
    private readonly K;
    private readonly ELO_DIVISOR;
    constructor();
    getEventEmitter(): EventEmitter<EventMap>;
    getRanking(): Ranking | APIErrorCode;
    createPlayer(player: {
        id: string;
    }): Player | APIErrorCode;
    createMatch(match: MatchResult): PublishedMatch | APIErrorCode;
}
export {};
