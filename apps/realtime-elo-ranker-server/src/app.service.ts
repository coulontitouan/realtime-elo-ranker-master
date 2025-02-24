import { Injectable } from '@nestjs/common';
import { RankingUpdate, RankingUpdateEvent } from './app.types';
import { EventEmitter } from 'events';

export interface EventMap {
    [RankingUpdate]: RankingUpdateEvent[];
}

@Injectable()
export abstract class AppService {
    protected eventEmitter = new EventEmitter<EventMap>();

    getEventEmitter() {
        return this.eventEmitter;
    }
}
