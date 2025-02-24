import { Injectable } from '@nestjs/common';
import { Player, MatchResult, PublishedMatch, Ranking, APIErrorCode, RankingUpdate, RankingUpdateEvent } from './app.types';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';

interface EventMap {
    [RankingUpdate]: RankingUpdateEvent[];
}

@Injectable()
export class AppService {
    private data: Ranking = [];
    private eventEmitter = new EventEmitter<EventMap>();

    private readonly K = 32;
    private readonly ELO_DIVISOR = 400;
    constructor() {
        const dataPath = path.join(__dirname, '../data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const jsonData: Ranking = JSON.parse(rawData);
        this.data = jsonData;
    }

    getEventEmitter(): EventEmitter<EventMap> {
        return this.eventEmitter;
    }

    getRanking(): Ranking | APIErrorCode {
        return this.data.sort((a, b) => b.rank - a.rank);
    }

    createPlayer(player: { id: string; }): Player | APIErrorCode {
        if (this.data.find(p => p.id === player.id)) {
            return 409;
        }
        if (!player.id.match(/^[a-zA-Z0-9]{0,16}$/)) {
            return 422;
        }
        const newPlayer = { id: player.id, rank: 0 };
        this.data.push(newPlayer);

        this.eventEmitter.emit(RankingUpdate, { player: newPlayer });

        return newPlayer;
    }

    createMatch(match: MatchResult): PublishedMatch | APIErrorCode {
        const winner = this.data.find(p => p.id === match.winner);
        const loser = this.data.find(p => p.id === match.loser);

        if (winner === undefined || loser === undefined) {
            return 422;
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

        this.eventEmitter.emit(RankingUpdate, { player: winner });
        this.eventEmitter.emit(RankingUpdate, { player: loser });

        return {
            winner: winner,
            loser: loser
        };
    }
}
