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
        let Embed = (0, export_1.LogsEmbed)();
        Embed.setColor('#FF631A');
        Embed.setAuthor(eventLang.embed.author);
        Embed.addFields({ name: 'Salons d\`utilisation', value: `${guild.channels.cache.get(messages.first().channelId).name}`, inline: true });
        Embed.setFooter('');
        const channel = guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({ embeds: [Embed] });
    }
}
exports.MessageDeleteBulk = MessageDeleteBulk;
