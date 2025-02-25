import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('RankingController', () => {
    let controller: RankingController;
    let service: RankingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RankingController],
            imports: [EventEmitterModule.forRoot()],
            providers: [
                {
                    provide: RankingService,
                    useValue: {
                        getRanking: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RankingController>(RankingController);
        service = module.get<RankingService>(RankingService);
    });

    it('doit récupérer le classement', async () => {
        const ranking = [{ id: 'player1', rank: 1200 }];
        jest.spyOn(service, 'getRanking').mockResolvedValue(ranking);

        await expect(controller.getRanking()).resolves.toEqual(ranking);
    });

    it("doit renvoyer une erreur si le classement est vide", async () => {
        jest.spyOn(service, 'getRanking').mockResolvedValue(HttpStatus.NOT_FOUND);

        await expect(controller.getRanking()).rejects.toThrow(
            new HttpException("Le classement n'est pas disponible car aucun joueur n'existe", HttpStatus.NOT_FOUND)
        );
    });
});