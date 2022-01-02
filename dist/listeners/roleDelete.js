"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDelete = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../util/export");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.roleRemove;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class RoleDelete extends sheweny_1.Event {
    constructor(client) {
        super(client, "roleDelete", {
            description: eventLang.description,
            once: false,
        });
    }
    async execute(role) {
        const auditLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_DELETE'
        });
        const executor = auditLogs.entries.first().executor;
        let Embed = (0, export_1.LogsEmbed)();
        Embed.setColor('#A600FF');
        Embed.setAuthor(eventLang.embed.author);
        Embed.addFields({ name: 'Nom du role', value: `${role.name}`, inline: true }, { name: `Id ru rôle`, value: `${role.id}`, inline: true });
        Embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`);
        const channel = role.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({ embeds: [Embed] });
    }
}
exports.RoleDelete = RoleDelete;
