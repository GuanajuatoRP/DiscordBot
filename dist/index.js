"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
const appConfig_json_1 = __importDefault(require("./util/appConfig.json"));
const language_json_1 = __importDefault(require("./util/language.json"));
const dotenv_1 = __importDefault(require("dotenv"));
const client = new sheweny_1.ShewenyClient({
    intents: 32767,
    admins: appConfig_json_1.default.botConfig.admins,
    mode: 'development',
    presence: {
        status: "online",
        afk: false,
        activities: [{
                name: language_json_1.default.bot.status.name,
                type: 'PLAYING',
            }],
    },
    managers: {
        commands: {
            directory: "./commands",
            loadAll: true,
            guildId: appConfig_json_1.default.botConfig.guildid,
            applicationPermissions: false,
            autoRegisterApplicationCommands: true,
            default: {
                adminOnly: false,
                category: 'InDev',
                channel: 'GUILD',
                cooldown: 2,
                examples: ['/newExample'],
                usage: ['/newExample aaa'],
                type: 'SLASH_COMMAND',
            }
        },
        events: {
            directory: "./listeners",
            loadAll: true,
        },
        buttons: {
            directory: "./interactions/buttons",
            loadAll: true,
        },
        // inhibitors: {
        //     directory: "./inhibitors",
        //     loadAll: true,
        // },
        // selectMenus: {
        //     directory: "./interactions/select-menu",
        //     loadAll: true,
        // },
    },
});
dotenv_1.default.config();
client.login(process.env.TOKEN);
