"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberAdd = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const export_1 = require("../util/export");
const eventLang = language_json_1.default.event.guildMemberAdd;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class GuildMemberAdd extends sheweny_1.Event {
    constructor(client) {
        super(client, "guildMemberAdd", {
            description: eventLang.description,
            once: false,
        });
    }
    execute(member) {
        let embed = (0, export_1.LogsEmbed)(member.displayName, member.id);
        embed.setAuthor(eventLang.embed.author);
        embed.setColor(eventLang.embed.color);
        embed.setDescription(eventLang.embed.description.format(member.user.tag, member.user.id));
        const channel = member.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({
            embeds: [embed]
        });
    }
}
exports.GuildMemberAdd = GuildMemberAdd;
