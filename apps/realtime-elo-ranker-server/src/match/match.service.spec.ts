import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpStatus } from '@nestjs/common';
import { MatchResult, RankingUpdate } from '../app.types';

describe('MatchService', () => {
    let matchService: MatchService;
    let playerService: PlayerService;
    let eventEmitter: EventEmitter2;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MatchService,
                {
                    provide: PlayerService,
                    useValue: {
                        getPlayer: jest.fn(),
                        updatePlayer: jest.fn(),
                    },
                },
                {
                    provide: EventEmitter2,
                    useValue: {
                        emit: jest.fn(),
                    },
                },
            ],
        }).compile();

        matchService = module.get<MatchService>(MatchService);
        playerService = module.get<PlayerService>(PlayerService);
        eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    });

    it('devrait creer un match et mettre a jour le classement', async () => {
        const match: MatchResult = { winner: 'player1', loser: 'player2', draw: false };
        const winner = { id: 'player1', rank: 1200 };
        const loser = { id: 'player2', rank: 1180 };

        jest.spyOn(playerService, 'getPlayer').mockImplementation(async ({ id }) =>
            id === 'player1' ? winner : loser
        );
        jest.spyOn(playerService, 'updatePlayer').mockResolvedValue(Promise.resolve(winner));

        const result = await matchService.createMatch(match);

        expect(result).toEqual({ winner, loser });
        expect(playerService.updatePlayer).toHaveBeenCalledTimes(2);
        expect(eventEmitter.emit).toHaveBeenCalledWith(RankingUpdate, { player: winner });
        expect(eventEmitter.emit).toHaveBeenCalledWith(RankingUpdate, { player: loser });
    });

    it('devrait renvoyer une erreur si un joueur est introuvable', async () => {
        const match: MatchResult = { winner: 'player1', loser: 'player2', draw: false };
        jest.spyOn(playerService, 'getPlayer').mockResolvedValue(HttpStatus.NOT_FOUND);

        const result = await matchService.createMatch(match);
        expect(result).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });
});
