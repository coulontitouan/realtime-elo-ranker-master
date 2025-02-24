import { Body, Controller, Get, HttpException, Post, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { MatchResult, Player, PublishedMatch, Ranking, RankingUpdate, RankingUpdateEvent } from './app.types';
import { map, Observable, Subject } from 'rxjs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Controller('/api')
export class AppController {
    private rankingUpdates$ = new Subject<RankingUpdateEvent>();

    constructor(private readonly appService: AppService, private eventEmitter: EventEmitter2) {
        const serviceEmitter = this.appService.getEventEmitter();

        serviceEmitter.on(RankingUpdate, (event: RankingUpdateEvent) => {
            this.eventEmitter.emit(RankingUpdate, event);
        });
    }

    @Post('/match')
    createMatch(@Body() match: MatchResult): PublishedMatch {
        const res = this.appService.createMatch(match);
        switch (res) {
            case 422:
                throw new HttpException("Soit le gagnant, soit le perdant indiqué n'existe pas", 422);
            default:
                return res as PublishedMatch;
        }
    }

    @Post('/player')
    createPlayer(@Body() player: { id: string }): Player {
        const res = this.appService.createPlayer(player);
        switch (res) {
            case 409:
                throw new HttpException('Le joueur existe déjà', 409);
            case 422:
                throw new HttpException("L'identifiant du joueur n'est pas valide", 422);
            default:
                return res as Player;
        }
    }

    @Get("/ranking")
    getRanking(): Ranking {
        const res = this.appService.getRanking();
        switch (res) {
            case 404:
                throw new HttpException("Le classement n'est pas disponible car aucun joueur n'existe", 404);
            default:
                return res as Ranking
        }
    }


    @Sse('/ranking/events')
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
