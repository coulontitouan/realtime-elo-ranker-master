import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { HttpStatus } from '@nestjs/common';
import { MatchResult, PublishedMatch } from '../app.types';

describe('MatchController', () => {
    let matchController: MatchController;
    let matchService: MatchService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MatchController],
            providers: [
                {
                    provide: MatchService,
                    useValue: {
                        createMatch: jest.fn(),
                    },
                },
            ],
        }).compile();

        matchController = module.get<MatchController>(MatchController);
        matchService = module.get<MatchService>(MatchService);
    });

    it('devrait créer un match et retourner le résultat', async () => {
        const match: MatchResult = { winner: 'player1', loser: 'player2', draw: false };
        const publishedMatch: PublishedMatch = {
            winner: { id: 'player1', rank: 1200 },
            loser: { id: 'player2', rank: 1180 },
        };

        jest.spyOn(matchService, 'createMatch').mockResolvedValue(publishedMatch);

        expect(await matchController.createMatch(match)).toEqual(publishedMatch);
    });

    it('devrait renvoyer une erreur si le match est invalide', async () => {
        const match: MatchResult = { winner: 'player_that_c@nt_3xist', loser: 'player_that_c@nt_3xist2', draw: false };
        jest.spyOn(matchService, 'createMatch').mockResolvedValue(HttpStatus.UNPROCESSABLE_ENTITY);

        await expect(matchController.createMatch(match)).rejects.toThrow("Soit le gagnant, soit le perdant indiqué n'existe pas");
    });
});