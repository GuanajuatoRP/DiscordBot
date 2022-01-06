"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDeleteBulk = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../util/export");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.messageBulkDelete;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class MessageDeleteBulk extends sheweny_1.Event {
    constructor(client) {
        super(client, "messageDeleteBulk", {
            description: eventLang.description,
            once: false,
        });
    }
    async execute(messages) {
        const guild = this.client.guilds.cache.get(messages.first().guildId);
        const auditLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_BULK_DELETE'
        });
        const executor = auditLogs.entries.first().executor;
        let Embed = (0, export_1.LogsEmbed)(executor.username, executor.id);
        Embed.setColor(eventLang.embed.color);
        Embed.setAuthor(eventLang.embed.author);
        Embed.addFields({ name: eventLang.embed.fields.salon.name, value: `${guild.channels.cache.get(messages.first().channelId).name}`, inline: true });
        const channel = guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({ embeds: [Embed] });
    }
}
exports.MessageDeleteBulk = MessageDeleteBulk;
