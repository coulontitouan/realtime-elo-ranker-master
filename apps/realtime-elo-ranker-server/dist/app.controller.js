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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_types_1 = require("./app.types");
const rxjs_1 = require("rxjs");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppController = class AppController {
    appService;
    eventEmitter;
    rankingUpdates$ = new rxjs_1.Subject();
    constructor(appService, eventEmitter) {
        this.appService = appService;
        this.eventEmitter = eventEmitter;
        const serviceEmitter = this.appService.getEventEmitter();
        serviceEmitter.on(app_types_1.RankingUpdate, (event) => {
            this.eventEmitter.emit(app_types_1.RankingUpdate, event);
        });
    }
    createMatch(match) {
        const res = this.appService.createMatch(match);
        switch (res) {
            case 422:
                throw new common_1.HttpException("Soit le gagnant, soit le perdant indiqué n'existe pas", 422);
            default:
                return res;
        }
    }
    createPlayer(player) {
        const res = this.appService.createPlayer(player);
        switch (res) {
            case 409:
                throw new common_1.HttpException('Le joueur existe déjà', 409);
            case 422:
                throw new common_1.HttpException("L'identifiant du joueur n'est pas valide", 422);
            default:
                return res;
        }
    }
    getRanking() {
        const res = this.appService.getRanking();
        switch (res) {
            case 404:
                throw new common_1.HttpException("Le classement n'est pas disponible car aucun joueur n'existe", 404);
            default:
                return res;
        }
    }
    getRankingEvents() {
        return this.rankingUpdates$.asObservable().pipe((0, rxjs_1.map)((data) => ({
            data: JSON.stringify({
                type: app_types_1.RankingUpdate,
                player: {
                    id: data.player.id,
                    rank: data.player.rank
                }
            })
        })));
    }
    handleRankingUpdate(event) {
        this.rankingUpdates$.next(event);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('/match'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "createMatch", null);
__decorate([
    (0, common_1.Post)('/player'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "createPlayer", null);
__decorate([
    (0, common_1.Get)("/ranking"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Sse)('/ranking/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "getRankingEvents", null);
__decorate([
    (0, event_emitter_1.OnEvent)(app_types_1.RankingUpdate),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "handleRankingUpdate", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('/api'),
    __metadata("design:paramtypes", [app_service_1.AppService, event_emitter_1.EventEmitter2])
], AppController);
//# sourceMappingURL=app.controller.js.map