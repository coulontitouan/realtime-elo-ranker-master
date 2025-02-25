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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const app_service_1 = require("../app.service");
const app_types_1 = require("../app.types");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./player.entity");
let PlayerService = class PlayerService extends app_service_1.AppService {
    playerRepository;
    constructor(playerRepository, eventEmitter) {
        super(eventEmitter);
        this.playerRepository = playerRepository;
    }
    async createPlayer(player) {
        const existingPlayer = await this.getPlayer(player);
        if (existingPlayer !== common_1.HttpStatus.NOT_FOUND)
            return common_1.HttpStatus.CONFLICT;
        if (!player.id.match(/^[a-zA-Z0-9]{0,16}$/))
            return common_1.HttpStatus.UNPROCESSABLE_ENTITY;
        const newPlayer = this.playerRepository.create({ id: player.id });
        await this.playerRepository.save(newPlayer);
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player: newPlayer });
        return { ...player, rank: 0 };
    }
    async updatePlayer(player) {
        const playerDB = await this.getPlayer(player);
        if (playerDB === common_1.HttpStatus.NOT_FOUND)
            return common_1.HttpStatus.NOT_FOUND;
        await this.playerRepository.save(player);
        this.eventEmitter.emit(app_types_1.RankingUpdate, { player });
        return player;
    }
    async getPlayer(player) {
        const playerDB = await this.playerRepository.findOne({ where: { id: player.id } });
        return playerDB || common_1.HttpStatus.NOT_FOUND;
    }
    async deletePlayer(player) {
        const playerDB = await this.getPlayer(player);
        if (playerDB === common_1.HttpStatus.NOT_FOUND)
            return common_1.HttpStatus.NOT_FOUND;
        await this.playerRepository.delete(player.id);
        return playerDB;
    }
    async getPlayers(options) {
        return this.playerRepository.find(options);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerDB)),
    __metadata("design:paramtypes", [typeorm_2.Repository, event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map