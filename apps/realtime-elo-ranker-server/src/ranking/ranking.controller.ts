import { Controller, Get, HttpException, HttpStatus, Sse } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Subject, Observable, map } from 'rxjs';
import { AppService } from 'src/app.service';
import { Ranking, RankingUpdate, RankingUpdateEvent } from 'src/app.types';
import { AppController } from 'src/app.controller';
import { RankingService } from './ranking.service';

const URL = `${AppController.URL}/ranking`;

@Controller(URL)
export class RankingController {
    private readonly URL: string = URL;

    private rankingUpdates$ = new Subject<RankingUpdateEvent>();

    constructor(private readonly rankingService: RankingService, private eventEmitter: EventEmitter2) {
        const serviceEmitter = this.rankingService.getEventEmitter();

        serviceEmitter.on(RankingUpdate, (event: RankingUpdateEvent) => {
            this.eventEmitter.emit(RankingUpdate, event);
        });
    }

    @Get()
    async getRanking(): Promise<Ranking> {
        const res = await this.rankingService.getRanking();
        switch (res) {
            case HttpStatus.NOT_FOUND:
                throw new HttpException("Le classement n'est pas disponible car aucun joueur n'existe", res);
            default:
                return res as Ranking
        }
    }

    @Sse('events')
    getRankingEvents(): Observable<{ data: string }> {
        return this.rankingUpdates$.asObservable().pipe(
            map((data) => ({
                data: JSON.stringify({
                    type: RankingUpdate,
                    player: {
                        id: data.player.id,
                        rank: data.player.rank
                    }
                })
            })));
    }

    @OnEvent(RankingUpdate)
    handleRankingUpdate(event: RankingUpdateEvent) {
        this.rankingUpdates$.next(event);
    }
}
