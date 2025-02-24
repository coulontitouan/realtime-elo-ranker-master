export interface MatchResult {
    winner: string;
    loser: string;
    draw: boolean;
}

export interface PlayerScratch {
    id: string;
}

export interface Player extends PlayerScratch {
    rank: number;
}

export interface PublishedMatch {
    winner: Player;
    loser: Player;
}

export const RankingUpdate = 'RankingUpdate';

export interface RankingUpdateEvent {
    player: Player;
}

export type Ranking = Player[];