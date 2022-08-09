"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const sheweny_1 = require("sheweny");
const appConfig_json_1 = __importDefault(require("./util/appConfig.json"));
const language_json_1 = __importDefault(require("./util/language.json"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = require("./APIToBot/api");
const discord_js_1 = require("discord.js");
// import express from 'express';
// import { TextChannel } from "discord.js";
// import { userValidateModel } from "./Api/Model/UserValidatedModel";
dotenv_1.default.config();
exports.client = new sheweny_1.ShewenyClient({
    intents: 32767,
    admins: appConfig_json_1.default.botConfig.admins,
    mode: "production",
    presence: {
        status: "online",
        afk: false,
        activities: [{
                name: language_json_1.default.bot.status.name,
                type: discord_js_1.ActivityType.Playing,
            }],
    },
    managers: {
        commands: {
            directory: "./commands",
            guildId: appConfig_json_1.default.botConfig.guildid,
            applicationPermissions: false,
            autoRegisterApplicationCommands: true,
            default: {
                adminOnly: false,
                category: 'InDev',
                channel: 'GUILD',
                cooldown: 2,
                examples: ['/newExample', '/newExample'],
                usage: ['/newExample aaa'],
                type: 'SLASH_COMMAND',
            }
        },
        events: {
            directory: "./listeners", //Event directory
        },
        buttons: {
            directory: "./interactions/buttons", //Button directory
        },
        selectMenus: {
            directory: "./interactions/selectMenu",
        },
        // inhibitors: {
        //     directory: "./inhibitors",
        //     loadAll: true,
        // },
    },
});
exports.client.login(process.env.TOKEN);
api_1.app.listen(process.env.PORT, () => console.log(`server started at http://localhost:${process.env.PORT}`));
