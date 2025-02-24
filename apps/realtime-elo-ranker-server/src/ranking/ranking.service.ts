import { HttpStatus, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Ranking, RankingUpdate, RankingUpdateEvent } from 'src/app.types';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class RankingService extends AppService {
    constructor(private playerService: PlayerService) { super() }

    async getRanking(): Promise<Ranking | HttpStatus.NOT_FOUND> {
        const ranking = await this.playerService.getPlayers({ order: { rank: 'DESC' } });
        if (ranking.length === 0) return HttpStatus.NOT_FOUND;
        return ranking;
    }

    emitRankingUpdate(event: RankingUpdateEvent) {
        this.eventEmitter.emit(RankingUpdate, event);
    }
}
