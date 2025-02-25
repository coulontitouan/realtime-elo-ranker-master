import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { PlayerService } from '../player/player.service';
import { HttpStatus } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('RankingService', () => {
    let service: RankingService;
    let playerService: PlayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EventEmitterModule.forRoot()],
            providers: [
                RankingService,
                {
                    provide: PlayerService,
                    useValue: {
                        getPlayers: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RankingService>(RankingService);
        playerService = module.get<PlayerService>(PlayerService);
    });

    it('doit récupérer un classement', async () => {
        const ranking = [{ id: 'player1', rank: 1200 }];
        jest.spyOn(playerService, 'getPlayers').mockResolvedValue(ranking);

        const result = await service.getRanking();
        expect(result).toEqual(ranking);
    });

    it("doit renvoyer NOT_FOUND si aucun joueur n'existe", async () => {
        jest.spyOn(playerService, 'getPlayers').mockResolvedValue([]);

        const result = await service.getRanking();
        expect(result).toBe(HttpStatus.NOT_FOUND);
    });
});