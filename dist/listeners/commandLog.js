"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLog = void 0;
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
// import lang from '../util/language.json'
// const eventLang = lang.event
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
// import fs from 'fs'
// import path from 'path'
class CommandLog extends sheweny_1.Event {
    constructor(client) {
        super(client, "CommandLog", {
            description: "Permet de logger l'ensemble des utilisation de commande",
            once: false,
        });
    }
    execute(interaction) {
        const member = interaction.member;
        const Embed = new discord_js_1.MessageEmbed();
        Embed.setAuthor('Command Log');
        Embed.setColor('#ff0000');
        Embed.fields.push({ name: "Nom de la commande", value: interaction.commandName, inline: true });
        Embed.fields.push({ name: "Salon d'utilisation", value: interaction.guild.channels.cache.get(interaction.channelId).name, inline: true });
        Embed.setFooter(`Cette action a été réalisée par ${member.displayName} -> id : ${member.id}`);
        Embed.setTimestamp();
        const channel = interaction.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.commandLog);
        // const d = new Date
        // const dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
        // const log = `${dformat}, Command : ${interaction.commandName}, channel : ${interaction.guild!.channels.cache.get(interaction.channelId)!.name} User : ${member.displayName}, UserID : ${member.id}`
        // fs.appendFileSync(path.join(__dirname,'/Logs/commandLog.txt'), log+'\n')
        return channel.send({
            embeds: [Embed]
        });
    }
}
exports.CommandLog = CommandLog;
