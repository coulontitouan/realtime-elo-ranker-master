import { HttpStatus } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppService } from '../app.service';
import { MatchResult, PublishedMatch } from '../app.types';
import { PlayerService } from '../player/player.service';
export declare class MatchService extends AppService {
    private playerService;
    private readonly K;
    private readonly ELO_DIVISOR;
    constructor(playerService: PlayerService, eventEmitter: EventEmitter2);
    createMatch(match: MatchResult): Promise<PublishedMatch | HttpStatus.UNPROCESSABLE_ENTITY>;
}
