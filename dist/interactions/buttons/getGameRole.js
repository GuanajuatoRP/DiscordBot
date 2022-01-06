"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Btns = void 0;
const sheweny_1 = require("sheweny");
const appConfig_json_1 = __importDefault(require("../../util/appConfig.json"));
class Btns extends sheweny_1.Button {
    constructor(client) {
        super(client, ["GetGameRole"]);
    }
    async execute(button) {
        const member = button.member;
        await button.deferUpdate();
        const RoleA = button.guild.roles.cache.get(appConfig_json_1.default.Roles.GMA);
        const RoleB = button.guild.roles.cache.get(appConfig_json_1.default.Roles.GMB);
        // gives the role to the user according to the embed 
        if (button.message.embeds[0].fields[0].value.indexOf(member.displayName) != -1) {
            member.roles.add(RoleA);
        }
        else {
            member.roles.add(RoleB);
        }
    }
}
exports.Btns = Btns;
