import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { PlayerScratch, Player } from 'src/app.types';
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
}
