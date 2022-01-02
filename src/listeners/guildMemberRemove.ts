import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { GuildMember, TextChannel } from "discord.js";
import lang from '../util/language.json'
import { LogsEmbed } from "../util/export";
const eventLang = lang.event.guildMemberRemove
import appconf from '../util/appConfig.json'

export class GuildMemberRemove extends Event {
    constructor(client: ShewenyClient) {
        super(client, "guildMemberRemove", {
            description: eventLang.description,
            once: false,
        });
    }

    execute(member : GuildMember){
        let embed = LogsEmbed()
            embed.setAuthor(eventLang.embed.author)
            embed.setColor('#FF0000')
            embed.setDescription(`${member.user.tag} **--**\`${member.user.id}\`**--**`)
            embed.setFooter('')
        const channel = member.guild.channels.cache.get(appconf.chanels.staff.botLog) as TextChannel
        channel.send({
            embeds: [embed]
        })
    }
}