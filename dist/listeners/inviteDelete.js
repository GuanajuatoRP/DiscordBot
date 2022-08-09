"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteDelete = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const export_1 = require("../util/export");
const eventLang = language_json_1.default.event.invitationRemove;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class InviteDelete extends sheweny_1.Event {
    constructor(client) {
        super(client, "inviteDelete", {
            description: eventLang.description,
            once: false,
        });
    }
    async execute(invite) {
        const guild = invite.guild;
        const auditLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 42
        });
        const executor = auditLogs.entries.first().executor;
        let Embed = (0, export_1.LogsEmbed)(executor.username, executor.id);
        Embed.setColor(eventLang.embed.color);
        Embed.setAuthor({ name: eventLang.embed.author });
        Embed.addFields({ name: eventLang.embed.fields.link.name, value: `${invite.url}`, inline: true }, { name: eventLang.embed.fields.code.name, value: `${invite.code}`, inline: true }, { name: eventLang.embed.fields.salon.name, value: `${invite.channel}`, inline: true });
        const channel = guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({ embeds: [Embed] });
    }
}
exports.InviteDelete = InviteDelete;
