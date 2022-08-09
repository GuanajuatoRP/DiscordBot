"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = __importDefault(require("./ApiBase"));
class MoneyController {
    static async getMoney(discordId) {
        return await ApiBase_1.default.userApi.get(`api/Money/${discordId}`);
    }
    static async addMoney(discordId, montant) {
        return await ApiBase_1.default.userApi.post(`api/Money/add/${discordId}`, { value: montant });
        ;
    }
    static async removeMoney(discordId, montant) {
        return await ApiBase_1.default.userApi.post(`api/Money/remove/${discordId}`, { value: montant });
        ;
    }
    static async setMoney(discordId, montant) {
        return await ApiBase_1.default.userApi.post(`api/Money/set/${discordId}`, { value: montant });
        ;
    }
}
exports.default = MoneyController;
