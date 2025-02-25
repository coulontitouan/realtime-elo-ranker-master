import { Injectable } from '@nestjs/common';
import { RankingUpdate, RankingUpdateEvent } from './app.types';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface EventMap {
    [RankingUpdate]: RankingUpdateEvent[];
}

@Injectable()
export abstract class AppService {
    constructor(protected eventEmitter: EventEmitter2) { }

    getEventEmitter() {
        return this.eventEmitter;
    }
}
