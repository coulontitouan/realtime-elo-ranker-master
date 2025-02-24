"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const Player_entity_1 = require("./entities/Player.entity");
const player_controller_1 = require("./player/player.controller");
const match_controller_1 = require("./match/match.controller");
const ranking_controller_1 = require("./ranking/ranking.controller");
const player_service_1 = require("./player/player.service");
const ranking_service_1 = require("./ranking/ranking.service");
const match_service_1 = require("./match/match.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([Player_entity_1.PlayerDB]),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController, player_controller_1.PlayerController, match_controller_1.MatchController, ranking_controller_1.RankingController],
        providers: [player_service_1.PlayerService, ranking_service_1.RankingService, match_service_1.MatchService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map