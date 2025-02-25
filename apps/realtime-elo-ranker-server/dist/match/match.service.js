"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const app_service_1 = require("../app.service");
const app_types_1 = require("../app.types");
const player_service_1 = require("../player/player.service");
let MatchService = class MatchService extends app_service_1.AppService {
    playerService;
    K = 32;
    ELO_DIVISOR = 400;
    constructor(playerService, eventEmitter) {
        super(eventEmitter);
        this.playerService = playerService;
    }
    async createMatch(match) {
        const winner = await this.playerService.getPlayer({ id: match.winner });
        const loser = await this.playerService.getPlayer({ id: match.loser });
        if (winner === common_1.HttpStatus.NOT_FOUND || loser === common_1.HttpStatus.NOT_FOUND) {
            return common_1.HttpStatus.UNPROCESSABLE_ENTITY;
        }
        const probability = (ratingA, ratingB) => {
            return 1 / (1 + Math.pow(10, (ratingB - ratingA) / this.ELO_DIVISOR));
        };
        const expectedWinW = probability(winner.rank, loser.rank);
        const expectedWinL = probability(loser.rank, winner.rank);
        if (match.draw) {
            winner.rank = Math.round(winner.rank + this.K * (0.5 - expectedWinW));
            loser.rank = Math.round(loser.rank + this.K * (0.5 - expectedWinL));
        }
        else {
            winner.rank = Math.round(winner.rank + this.K * (1 - expectedWinW));
            loser.rank = Math.round(loser.rank + this.K * (0 - expectedWinL));
        }
        await this.playerService.updatePlayer(winner);
        await this.playerService.updatePlayer(loser);
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player: winner });
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player: loser });
        return { winner, loser };
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService, event_emitter_1.EventEmitter2])
], MatchService);
//# sourceMappingURL=match.service.js.map