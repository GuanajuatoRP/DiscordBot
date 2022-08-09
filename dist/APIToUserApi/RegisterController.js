"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = __importDefault(require("./ApiBase"));
class RegisterController {
    static async register(model) {
        // return await ApiBase.userApi.post('/register', model);
        return "aa";
    }
    static async UserExist(discordId) {
        return await ApiBase_1.default.userApi.get('/UserExist/{0}'.format(discordId));
    }
}
exports.default = RegisterController;
