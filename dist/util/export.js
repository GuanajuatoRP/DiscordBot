"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelObject = exports.CommandLog = exports.LogsEmbed = exports.DefaultEmbed = exports.CustomEmbedMenu = exports.saveEmbed = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lang = require('./language.json');
const cemLang = lang.embeds.CustomEmbedMenu;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const saveEmbed = (embed) => {
    fs_1.default.writeFile(path_1.default.join(__dirname, './customEmbed.json'), JSON.stringify(embed), function writeJSON(err) {
        if (err)
            return console.log(err);
    });
};
exports.saveEmbed = saveEmbed;
exports.CustomEmbedMenu = new discord_js_1.MessageActionRow()
    .addComponents(new discord_js_1.MessageSelectMenu()
    .setCustomId(cemLang.customId)
    .setPlaceholder(cemLang.placeHolder)
    .addOptions([{
        label: cemLang.Options[0].label,
        description: cemLang.Options[0].description,
        value: cemLang.Options[0].value
    },
    {
        label: cemLang.Options[1].label,
        description: cemLang.Options[1].description,
        value: cemLang.Options[1].value,
    },
    {
        label: cemLang.Options[2].label,
        description: cemLang.Options[2].description,
        value: cemLang.Options[2].value
    },
    {
        label: cemLang.Options[3].label,
        description: cemLang.Options[3].description,
        value: cemLang.Options[3].value,
    }, {
        label: cemLang.Options[4].label,
        description: cemLang.Options[4].description,
        value: cemLang.Options[4].value,
    },
    {
        label: cemLang.Options[5].label,
        description: cemLang.Options[5].description,
        value: cemLang.Options[5].value,
    },
    {
        label: cemLang.Options[6].label,
        description: cemLang.Options[6].description,
        value: cemLang.Options[6].value,
    }, {
        label: cemLang.Options[7].label,
        description: cemLang.Options[7].description,
        value: cemLang.Options[7].value,
    }
]));
const DefaultEmbed = () => {
    return new discord_js_1.MessageEmbed().setAuthor(lang.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setColor('#ff8000').setFooter(lang.embeds.default.footer, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg").setTimestamp().addFields();
};
exports.DefaultEmbed = DefaultEmbed;
const LogsEmbed = () => {
    return new discord_js_1.MessageEmbed().setAuthor(lang.embeds.LogsEmbed.author).setColor('#ff0000').setFooter(lang.embeds.LogsEmbed.footer).setTimestamp();
};
exports.LogsEmbed = LogsEmbed;
const CommandLog = (member, interaction) => {
    const Embed = new discord_js_1.MessageEmbed();
    Embed.setAuthor('Command Log');
    Embed.setColor('#ff0000');
    Embed.fields.push({ name: "Nom de la commande", value: interaction.commandName, inline: true });
    Embed.fields.push({ name: "Salon d'utilisation", value: interaction.guild.channels.cache.get(interaction.channelId).name, inline: true });
    Embed.setFooter(`Cette action a été réalisée par ${member.nickname != null ? member.nickname : member.user.username} -> id : ${member.id}`);
    Embed.setTimestamp();
    const channel = interaction.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.commandLog);
    const d = new Date;
    const dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    const log = `${dformat}, Command : ${interaction.commandName}, channel : ${interaction.guild.channels.cache.get(interaction.channelId).name} User : ${member.nickname != null ? member.nickname : member.user.username}, UserID : ${member.id}`;
    fs_1.default.appendFileSync(path_1.default.join(__dirname, '/commandLog.txt'), log + '\n');
    return channel.send({
        embeds: [Embed]
    });
};
exports.CommandLog = CommandLog;
exports.ChannelObject = {
    name: String,
    channelInfo: {
        type: String,
        topic: String,
        permissionsList: Array,
        position: Number,
        userLimit: Number
    },
    messages: Array
};
