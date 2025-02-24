import { HttpStatus, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { MatchResult, PublishedMatch, RankingUpdate } from 'src/app.types';
import { PlayerService } from 'src/player/player.service';
import { RankingService } from 'src/ranking/ranking.service';

@Injectable()
export class MatchService extends AppService {
    private readonly K = 32;
    private readonly ELO_DIVISOR = 400;

    constructor(private playerService: PlayerService) { super() }

    async createMatch(match: MatchResult): Promise<PublishedMatch | HttpStatus.UNPROCESSABLE_ENTITY> {
        const winner = await this.playerService.getPlayer({ id: match.winner });
        const loser = await this.playerService.getPlayer({ id: match.loser });

        if (winner === HttpStatus.NOT_FOUND || loser === HttpStatus.NOT_FOUND) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        const probability = (ratingA: number, ratingB: number): number => {
            return 1 / (1 + Math.pow(10, (ratingB - ratingA) / this.ELO_DIVISOR));
        };

        const expectedWinW = probability(winner.rank, loser.rank);
        const expectedWinL = probability(loser.rank, winner.rank);

        if (match.draw) {
            winner.rank = Math.round(winner.rank + this.K * (0.5 - expectedWinW));
            loser.rank = Math.round(loser.rank + this.K * (0.5 - expectedWinL));
        } else {
            winner.rank = Math.round(winner.rank + this.K * (1 - expectedWinW));
            loser.rank = Math.round(loser.rank + this.K * (0 - expectedWinL));
        }

        await this.playerService.updatePlayer(winner);
        await this.playerService.updatePlayer(loser);

        this.eventEmitter.emit(RankingUpdate, { player: winner });
        this.eventEmitter.emit(RankingUpdate, { player: loser });

        return { winner, loser };
    }
}
