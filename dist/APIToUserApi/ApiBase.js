"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ApiBase {
    static get userApi() {
        if (!this._userApi) {
            this._userApi = axios_1.default.create({
                baseURL: process.env.USER_API_URL,
                timeout: 10000000,
                headers: {
                    'X-Custom-Header': 'foobar',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
        return this._userApi;
    }
}
exports.default = ApiBase;
