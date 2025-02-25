import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppController } from '../app.controller';
import { MatchResult, PublishedMatch } from '../app.types';
import { MatchService } from './match.service';

const URL = `${AppController.URL}/match`;

@Controller(URL)
export class MatchController {
    private readonly URL: string = URL;
    constructor(private matchService: MatchService) { }

    @Post()
    async createMatch(@Body() match: MatchResult): Promise<PublishedMatch> {
        const res = await this.matchService.createMatch(match);
        switch (res) {
            case HttpStatus.UNPROCESSABLE_ENTITY:
                throw new HttpException("Soit le gagnant, soit le perdant indiqué n'existe pas", res);
            default:
                return res as PublishedMatch;
        }
    }
}
