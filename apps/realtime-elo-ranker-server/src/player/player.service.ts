import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { PlayerScratch, Player, RankingUpdate } from 'src/app.types';
import { PlayerDB } from 'src/entities/Player.entity';
import { RankingService } from 'src/ranking/ranking.service';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PlayerService extends AppService {
    constructor(@InjectRepository(PlayerDB) private readonly playerRepository: Repository<PlayerDB>) { super() }

    async createPlayer(player: PlayerScratch): Promise<Player | HttpStatus> {
        const existingPlayer = await this.getPlayer(player);
        if (existingPlayer !== HttpStatus.NOT_FOUND) {
            return HttpStatus.CONFLICT;
        }
        if (!player.id.match(/^[a-zA-Z0-9]{0,16}$/)) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        const newPlayer = this.playerRepository.create({ id: player.id });
        await this.playerRepository.save(newPlayer);

        this.eventEmitter.emit(RankingUpdate, { player: newPlayer });

        return newPlayer;
    }

    async updatePlayer(player: Player): Promise<Player | HttpStatus.NOT_FOUND> {
        const playerDB = await this.getPlayer(player);
        if (playerDB === HttpStatus.NOT_FOUND) {
            return HttpStatus.NOT_FOUND;
        }

        await this.playerRepository.save(player);
        this.eventEmitter.emit(RankingUpdate, { player });
        return player;
    }

    async getPlayer(player: Player | PlayerScratch): Promise<Player | HttpStatus.NOT_FOUND> {
        const playerDB = await this.playerRepository.findOne({ where: { id: player.id } });
        return !playerDB ? HttpStatus.NOT_FOUND : playerDB;
    }

    async getPlayers(options?: FindManyOptions<PlayerDB>): Promise<Player[]> {
        return this.playerRepository.find(options);
    }
}
