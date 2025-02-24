import { MatchResult, PublishedMatch } from 'src/app.types';
import { MatchService } from './match.service';
export declare class MatchController {
    private matchService;
    private readonly URL;
    constructor(matchService: MatchService);
    createMatch(match: MatchResult): Promise<PublishedMatch>;
}
