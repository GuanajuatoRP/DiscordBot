"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLog = void 0;
const export_1 = require("./../util/export");
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.adminCommandLog;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CommandLog extends sheweny_1.Event {
    constructor(client) {
        super(client, "AdminCommandLog", {
            description: eventLang.description,
            once: false,
        });
    }
    execute(interaction) {
        const member = interaction.member;
        const Embed = (0, export_1.LogsEmbed)(member.displayName, member.id);
        Embed.setAuthor(eventLang.embed.author);
        Embed.setColor(eventLang.embed.color);
        Embed.fields.push({ name: eventLang.embed.fields.commandName.name, value: interaction.commandName, inline: true });
        Embed.fields.push({ name: eventLang.embed.fields.salon.name, value: interaction.guild.channels.cache.get(interaction.channelId).name, inline: true });
        Embed.setTimestamp();
        const channel = interaction.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.commandLog);
        const d = new Date;
        const today = [d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`, d.getMonth() + 1 > 9 ? d.getMonth() : `0${d.getMonth() + 1}`, d.getFullYear()].join('-');
        const dformat = today + ' ' + [d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`, d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`, d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`].join(':');
        const commandOptionValue = interaction.options.data.map(o => `Option Name : ${o.name}, value : ${o.value}`).join(', ');
        const log = `${dformat}, Command : ${interaction.commandName}, ${commandOptionValue != '' ? `${commandOptionValue}, ` : ''}channel : ${interaction.guild.channels.cache.get(interaction.channelId).name} User : ${member.displayName}, UserID : ${member.id}`;
        fs_1.default.appendFileSync(path_1.default.join(__dirname, `../util/logs/adminCommandLog_${today}.txt`), log + '\n');
        return channel.send({
            embeds: [Embed]
        });
    }
}
exports.CommandLog = CommandLog;
