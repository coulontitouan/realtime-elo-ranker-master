export interface MatchResult {
    winner: string;
    loser: string;
    draw: boolean;
}
export interface Player {
    id: string;
    rank: number;
}
export interface PublishedMatch {
    winner: Player;
    loser: Player;
}
export type APIErrorCode = 400 | 404 | 409 | 422;
export declare const RankingUpdate = "RankingUpdate";
export interface RankingUpdateEvent {
    player: Player;
}
export type Ranking = Player[];
