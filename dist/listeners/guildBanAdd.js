"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildBanAdd = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../util/export");
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.guildBanAdd;
class GuildBanAdd extends sheweny_1.Event {
    constructor(client) {
        super(client, "guildBanAdd", {
            description: eventLang.description,
            once: false,
        });
    }
    async execute(ban) {
        const auditLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 22
        });
        const executor = auditLogs.entries.first().executor;
        let embed = (0, export_1.LogsEmbed)(executor.username, executor.id);
        embed.setAuthor({ name: eventLang.embed.author });
        embed.addFields({ name: eventLang.embed.fields.ban.name.format(ban.user.tag, ban.user.id), value: eventLang.embed.fields.reason.name.format(ban.reason), inline: false });
        const channel = ban.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({
            embeds: [embed]
        });
    }
}
exports.GuildBanAdd = GuildBanAdd;
