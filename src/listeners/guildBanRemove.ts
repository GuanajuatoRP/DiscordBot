import { Event } from "sheweny";
import { ColorResolvable, GuildBan, TextChannel } from "discord.js";
import { LogsEmbed } from "../util/export";
import type { ShewenyClient } from "sheweny";
import lang from '../util/language.json'
const eventLang = lang.event.guildBanRemove
import appConf from '../util/appConfig.json'

export class GuildBanRemove extends Event {
    constructor(client: ShewenyClient) {
        super(client, "guildBanRemove", {
            description: eventLang.description,
            once: false,
        });
    }

    async execute(ban : GuildBan) {
        const auditLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE'
        })
        const executor = auditLogs.entries.first()!.executor
        let embed = LogsEmbed(executor!.username,executor!.id)
            embed.setColor(eventLang.embed.color as ColorResolvable)
            embed.setAuthor(eventLang.embed.author)
            embed.addField(eventLang.embed.fields.unban.name.format(ban.user.tag,ban.user.id), eventLang.embed.fields.reason.name.format(ban.reason!), false)

        const channel = ban.guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel.send({
            embeds : [embed]
        })

    }
}