"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCreate = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../util/export");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.roleCreate;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class RoleCreate extends sheweny_1.Event {
    constructor(client) {
        super(client, "roleCreate", {
            description: eventLang.description,
            once: false,
        });
    }
    async execute(role) {
        const auditLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 30
        });
        const executor = auditLogs.entries.first().executor;
        let Embed = (0, export_1.LogsEmbed)(executor.username, executor.id);
        Embed.setColor(eventLang.embed.color);
        Embed.setAuthor({ name: eventLang.embed.author });
        Embed.addFields({ name: eventLang.embed.fields.roleName.name, value: `${role.name}`, inline: true }, { name: eventLang.embed.fields.roleId.name, value: `${role.id}`, inline: true });
        Embed.setFooter({ text: `Cette action a été réalisée par ${executor.username} -> id : ${executor.id}` });
        const channel = role.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({ embeds: [Embed] });
    }
}
exports.RoleCreate = RoleCreate;
