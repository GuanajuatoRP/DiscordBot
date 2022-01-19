import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import lang from '../util/language.json'
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
        
        let embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor("[-] {0}".format(member.user.tag))
            .setDescription(eventLang.embed.description.format(member.displayName))
            .setFooter("GuildMember Remove")
            .setTimestamp()
        const channel = member.guild.channels.cache.get(appconf.chanels.staff.serverLog) as TextChannel
        channel.send({
            embeds: [embed]
        })
    }
}