import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ColorResolvable, GuildMember, TextChannel } from "discord.js";
import lang from '../util/language.json'
import { LogsEmbed } from "../util/export";
const eventLang = lang.event.guildMemberAdd
import appconf from '../util/appConfig.json'

export class GuildMemberAdd extends Event {
    constructor(client: ShewenyClient) {
        super(client, "guildMemberAdd", {
            description: eventLang.description,
            once: false,
        });
    }

    execute(member : GuildMember){
        let embed = LogsEmbed(member.displayName, member.id)
            embed.setAuthor(eventLang.embed.author)
            embed.setColor(eventLang.embed.color as ColorResolvable)
            embed.setDescription(eventLang.embed.description.format(member.user.tag,member.user.id))
        const channel = member.guild.channels.cache.get(appconf.chanels.staff.botLog) as TextChannel
        channel.send({
            embeds: [embed]
        })
    }
}