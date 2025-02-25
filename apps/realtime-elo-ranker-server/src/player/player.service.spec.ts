import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerDB } from './player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player, PlayerScratch } from '../app.types';
import { HttpStatus } from '@nestjs/common';

describe('PlayerService', () => {
    let service: PlayerService;
    let repo: Repository<PlayerDB>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(PlayerDB),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                EventEmitter2,
            ],
        }).compile();

        service = module.get<PlayerService>(PlayerService);
        repo = module.get<Repository<PlayerDB>>(getRepositoryToken(PlayerDB));
    });

    it('doit créer un joueur', async () => {
        const playerScratch: PlayerScratch = { id: 'newPlayer' };
        jest.spyOn(repo, 'findOne').mockResolvedValue(null);
        jest.spyOn(repo, 'save').mockResolvedValue({ id: 'newPlayer', rank: 0 } as PlayerDB);

        const result = await service.createPlayer(playerScratch);
        expect(result).toEqual({ id: 'newPlayer', rank: 0 });
    });

    it("doit retourner un conflit si le joueur existe déjà", async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValue({ id: 'existingPlayer' } as PlayerDB);

        const result = await service.createPlayer({ id: 'existingPlayer' });
        expect(result).toBe(HttpStatus.CONFLICT);
    });

    it('doit récupérer un joueur existant', async () => {
        const player: Player = { id: 'player1', rank: 1000 };
        jest.spyOn(repo, 'findOne').mockResolvedValue(player as PlayerDB);

        const result = await service.getPlayer({ id: 'player1' });
        expect(result).toEqual(player);
    });

    it("doit renvoyer NOT_FOUND si le joueur n'existe pas", async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValue(null);

        const result = await service.getPlayer({ id: 'unknown' });
        expect(result).toBe(HttpStatus.NOT_FOUND);
    });
});