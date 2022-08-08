"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberAdd = void 0;
const discord_js_1 = require("discord.js");
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.guildMemberAdd;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
class GuildMemberAdd extends sheweny_1.Event {
    constructor(client) {
        super(client, "guildMemberAdd", {
            description: eventLang.description,
            once: false,
        });
    }
    execute(member) {
        // send Log
        let embed = new discord_js_1.EmbedBuilder()
            .setColor(0x57f287)
            .setAuthor({ name: "[+] {0}".format(member.user.tag) })
            .setDescription(eventLang.embed.description.format(member.displayName))
            .setFooter({ text: "GuildMember Add" })
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL());
        const channel = member.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.serverLog);
        channel.send({
            embeds: [embed]
        });
    }
}
exports.GuildMemberAdd = GuildMemberAdd;
