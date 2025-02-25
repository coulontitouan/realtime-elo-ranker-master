import { RankingUpdate, RankingUpdateEvent } from './app.types';
import { EventEmitter2 } from '@nestjs/event-emitter';
export interface EventMap {
    [RankingUpdate]: RankingUpdateEvent[];
}
export declare abstract class AppService {
    protected eventEmitter: EventEmitter2;
    constructor(eventEmitter: EventEmitter2);
    getEventEmitter(): EventEmitter2;
}
