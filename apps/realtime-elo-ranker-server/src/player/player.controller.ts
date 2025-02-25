import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppController } from '../app.controller';
import { PlayerScratch, Player } from '../app.types';
import { PlayerService } from './player.service';

const URL = `${AppController.URL}/player`;

@Controller(URL)
export class PlayerController {

    constructor(private playerService: PlayerService) { }

    @Get(':id')
    async getPlayer(@Param('id') id: string): Promise<Player> {
        const res = await this.playerService.getPlayer({ id });
        switch (res) {
            case HttpStatus.NOT_FOUND:
                throw new HttpException("Le joueur n'existe pas", res);
            default:
                return res as Player;
        }
    }

    @Post()
    async createPlayer(@Body() player: PlayerScratch): Promise<Player> {
        const res = await this.playerService.createPlayer(player);
        switch (res) {
            case HttpStatus.CONFLICT:
                throw new HttpException('Le joueur existe déjà', res);
            case HttpStatus.UNPROCESSABLE_ENTITY:
                throw new HttpException("L'identifiant du joueur n'est pas valide", res);
            default:
                return res as Player;
        }
    }

    @Delete(':id')
    async deletePlayer(@Param('id') id: string): Promise<Player> {
        const res = await this.playerService.deletePlayer({ id });
        switch (res) {
            case HttpStatus.NOT_FOUND:
                throw new HttpException("Le joueur n'existe pas", res);
            default:
                return res as Player;
        }
    }
}
