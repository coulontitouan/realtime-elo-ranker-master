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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const rxjs_1 = require("rxjs");
const app_types_1 = require("../app.types");
const app_controller_1 = require("../app.controller");
const ranking_service_1 = require("./ranking.service");
const URL = `${app_controller_1.AppController.URL}/ranking`;
let RankingController = class RankingController {
    rankingService;
    eventEmitter;
    URL = URL;
    rankingUpdates$ = new rxjs_1.Subject();
    constructor(rankingService, eventEmitter) {
        this.rankingService = rankingService;
        this.eventEmitter = eventEmitter;
        this.eventEmitter.on(app_types_1.RankingUpdate, (event) => {
            this.rankingUpdates$.next(event);
        });
    }
    async getRanking() {
        const res = await this.rankingService.getRanking();
        switch (res) {
            case common_1.HttpStatus.NOT_FOUND:
                throw new common_1.HttpException("Le classement n'est pas disponible car aucun joueur n'existe", res);
            default:
                return res;
        }
    }
    getRankingEvents() {
        return this.rankingUpdates$.asObservable().pipe((0, rxjs_1.map)((data) => ({
            data: JSON.stringify({
                type: app_types_1.RankingUpdate,
                player: data.player
            })
        })));
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Sse)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "getRankingEvents", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)(URL),
    __metadata("design:paramtypes", [ranking_service_1.RankingService, event_emitter_1.EventEmitter2])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map