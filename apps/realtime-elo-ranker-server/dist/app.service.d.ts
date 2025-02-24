import { RankingUpdate, RankingUpdateEvent } from './app.types';
import { EventEmitter } from 'events';
export interface EventMap {
    [RankingUpdate]: RankingUpdateEvent[];
}
export declare abstract class AppService {
    protected eventEmitter: EventEmitter<EventMap>;
    getEventEmitter(): EventEmitter<EventMap>;
}
