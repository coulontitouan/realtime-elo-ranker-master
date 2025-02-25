import { HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppService } from '../app.service';
import { Ranking, RankingUpdate, RankingUpdateEvent } from '../app.types';
import { PlayerService } from '../player/player.service';

@Injectable()
export class RankingService extends AppService {
    constructor(private playerService: PlayerService, eventEmitter: EventEmitter2) { super(eventEmitter) }

    async getRanking(): Promise<Ranking | HttpStatus.NOT_FOUND> {
        const ranking = await this.playerService.getPlayers({ order: { rank: 'DESC' } });
        return ranking.length === 0 ? HttpStatus.NOT_FOUND : ranking;
    }

    emitRankingUpdate(event: RankingUpdateEvent) {
        this.eventEmitter.emit(RankingUpdate, event);
    }
}
