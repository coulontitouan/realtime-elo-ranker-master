import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Player, PlayerScratch } from '../app.types';

describe('PlayerController', () => {
    let controller: PlayerController;
    let service: PlayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [
                {
                    provide: PlayerService,
                    useValue: {
                        getPlayer: jest.fn(),
                        createPlayer: jest.fn(),
                        deletePlayer: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<PlayerController>(PlayerController);
        service = module.get<PlayerService>(PlayerService);
    });

    it('doit renvoyer un joueur existant', async () => {
        const player: Player = { id: 'player1', rank: 1000 };
        jest.spyOn(service, 'getPlayer').mockResolvedValue(player);

        await expect(controller.getPlayer('player1')).resolves.toEqual(player);
    });

    it("doit renvoyer une erreur si le joueur n'existe pas", async () => {
        jest.spyOn(service, 'getPlayer').mockResolvedValue(HttpStatus.NOT_FOUND);

        await expect(controller.getPlayer('player1')).rejects.toThrow(
            new HttpException("Le joueur n'existe pas", HttpStatus.NOT_FOUND)
        );
    });

    it('doit créer un joueur', async () => {
        const playerScratch: PlayerScratch = { id: 'newPlayer' };
        const player: Player = { id: 'newPlayer', rank: 1000 };
        jest.spyOn(service, 'createPlayer').mockResolvedValue(player);

        await expect(controller.createPlayer(playerScratch)).resolves.toEqual(player);
    });

    it("doit renvoyer une erreur si le joueur existe déjà", async () => {
        jest.spyOn(service, 'createPlayer').mockResolvedValue(HttpStatus.CONFLICT);

        await expect(controller.createPlayer({ id: 'existingPlayer' })).rejects.toThrow(
            new HttpException('Le joueur existe déjà', HttpStatus.CONFLICT)
        );
    });

    it("doit supprimer un joueur", async () => {
        const player: Player = { id: 'player1', rank: 1000 };
        jest.spyOn(service, 'deletePlayer').mockResolvedValue(player);

        await expect(controller.deletePlayer('player1')).resolves.toEqual(player);
    });

    it("doit renvoyer une erreur si le joueur à supprimer n'existe pas", async () => {
        jest.spyOn(service, 'deletePlayer').mockResolvedValue(HttpStatus.NOT_FOUND);

        await expect(controller.deletePlayer('unknownPlayer')).rejects.toThrow(
            new HttpException("Le joueur n'existe pas", HttpStatus.NOT_FOUND)
        );
    });
});