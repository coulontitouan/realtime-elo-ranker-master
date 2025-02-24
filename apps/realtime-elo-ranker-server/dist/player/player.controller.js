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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../app.controller");
const player_service_1 = require("./player.service");
const URL = `${app_controller_1.AppController.URL}/player`;
let PlayerController = class PlayerController {
    playerService;
    constructor(playerService) {
        this.playerService = playerService;
    }
    async getPlayer(id) {
        const res = await this.playerService.getPlayer({ id });
        switch (res) {
            case common_1.HttpStatus.NOT_FOUND:
                throw new common_1.HttpException("Le joueur n'existe pas", res);
            default:
                return res;
        }
    }
    async createPlayer(player) {
        const res = await this.playerService.createPlayer(player);
        switch (res) {
            case common_1.HttpStatus.CONFLICT:
                throw new common_1.HttpException('Le joueur existe déjà', res);
            case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                throw new common_1.HttpException("L'identifiant du joueur n'est pas valide", res);
            default:
                return res;
        }
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "getPlayer", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "createPlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)(URL),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map