import { HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { MatchResult, PublishedMatch } from 'src/app.types';
import { PlayerService } from 'src/player/player.service';
export declare class MatchService extends AppService {
    private playerService;
    private readonly K;
    private readonly ELO_DIVISOR;
    constructor(playerService: PlayerService);
    createMatch(match: MatchResult): Promise<PublishedMatch | HttpStatus.UNPROCESSABLE_ENTITY>;
}
