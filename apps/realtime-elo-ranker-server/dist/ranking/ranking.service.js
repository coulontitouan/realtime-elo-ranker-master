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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const app_types_1 = require("../app.types");
const player_service_1 = require("../player/player.service");
let RankingService = class RankingService extends app_service_1.AppService {
    playerService;
    constructor(playerService) {
        super();
        this.playerService = playerService;
    }
    async getRanking() {
        const ranking = await this.playerService.getPlayers({ order: { rank: 'DESC' } });
        if (ranking.length === 0)
            return common_1.HttpStatus.NOT_FOUND;
        return ranking;
    }
    emitRankingUpdate(event) {
        this.eventEmitter.emit(app_types_1.RankingUpdate, event);
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map