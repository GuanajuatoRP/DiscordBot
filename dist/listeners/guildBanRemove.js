"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildBanRemove = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../util/export");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.guildBanRemove;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class GuildBanRemove extends sheweny_1.Event {
    constructor(client) {
        super(client, "guildBanRemove", {
            description: "Permet de logger quand et qui déban un utilisateur",
            once: false,
        });
    }
    async execute(ban) {
        const auditLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE'
        });
        const executor = auditLogs.entries.first().executor;
        let embed = (0, export_1.LogsEmbed)();
        embed.setColor('#59ff00');
        embed.setAuthor(eventLang.embed.author);
        embed.addField(`${ban.user.tag} **---**\`${ban.user.id}\`**---** a été débannis`, `Pour la raison suivante ${ban.reason}`, false);
        embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`);
        const channel = ban.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({
            embeds: [embed]
        });
    }
}
exports.GuildBanRemove = GuildBanRemove;
