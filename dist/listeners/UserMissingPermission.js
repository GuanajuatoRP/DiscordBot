"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMissingPermissions = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const export_1 = require("../util/export");
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const eventLang = language_json_1.default.event.userMissingPermission;
class userMissingPermissions extends sheweny_1.Event {
    constructor(client) {
        super(client, "userMissingPermissions", {
            description: eventLang.description,
            emitter: client.managers.commands,
            once: false,
        });
    }
    execute(interaction) {
        const executor = interaction.user;
        const embed = (0, export_1.LogsEmbed)();
        embed.setAuthor('User Not Have Permission');
        embed.fields.push({ name: "Nom de la commande", value: interaction.commandName, inline: true });
        embed.fields.push({ name: "Salon d'utilisation", value: interaction.guild.channels.cache.get(interaction.channelId).name, inline: true });
        embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`);
        const channel = interaction.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog);
        channel.send({
            embeds: [embed]
        });
        return interaction.reply({
            content: eventLang.interaction.content,
            embeds: [embed],
            ephemeral: true
        });
    }
}
exports.userMissingPermissions = userMissingPermissions;
