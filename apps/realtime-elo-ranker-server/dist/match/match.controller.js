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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../app.controller");
const match_service_1 = require("./match.service");
const URL = `${app_controller_1.AppController.URL}/match`;
let MatchController = class MatchController {
    matchService;
    URL = URL;
    constructor(matchService) {
        this.matchService = matchService;
    }
    async createMatch(match) {
        const res = await this.matchService.createMatch(match);
        switch (res) {
            case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                throw new common_1.HttpException("Soit le gagnant, soit le perdant indiqué n'existe pas", res);
            default:
                return res;
        }
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "createMatch", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)(URL),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map