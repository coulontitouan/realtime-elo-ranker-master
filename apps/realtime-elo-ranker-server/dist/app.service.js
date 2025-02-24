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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const app_types_1 = require("./app.types");
const fs = require("fs");
const path = require("path");
const events_1 = require("events");
let AppService = class AppService {
    data = [];
    eventEmitter = new events_1.EventEmitter();
    K = 32;
    ELO_DIVISOR = 400;
    constructor() {
        const dataPath = path.join(__dirname, '../data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        this.data = jsonData;
    }
    getEventEmitter() {
        return this.eventEmitter;
    }
    getRanking() {
        return this.data.sort((a, b) => b.rank - a.rank);
    }
    createPlayer(player) {
        if (this.data.find(p => p.id === player.id)) {
            return 409;
        }
        if (!player.id.match(/^[a-zA-Z0-9]{0,16}$/)) {
            return 422;
        }
        const newPlayer = { id: player.id, rank: 0 };
        this.data.push(newPlayer);
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player: newPlayer });
        return newPlayer;
    }
    createMatch(match) {
        const winner = this.data.find(p => p.id === match.winner);
        const loser = this.data.find(p => p.id === match.loser);
        if (winner === undefined || loser === undefined) {
            return 422;
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
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player: winner });
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player: loser });
        return {
            winner: winner,
            loser: loser
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map