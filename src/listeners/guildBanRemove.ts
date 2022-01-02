import { Event } from "sheweny";
import { GuildBan, TextChannel } from "discord.js";
import { LogsEmbed } from "../util/export";
import type { ShewenyClient } from "sheweny";
import lang from '../util/language.json'
const eventLang = lang.event.guildBanRemove
import appConf from '../util/appConfig.json'

export class GuildBanRemove extends Event {
    constructor(client: ShewenyClient) {
        super(client, "guildBanRemove", {
            description: "Permet de logger quand et qui déban un utilisateur",
            once: false,
        });
    }

    async execute(ban : GuildBan) {
        const auditLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE'
        })
        const executor = auditLogs.entries.first()!.executor
        let embed = LogsEmbed()
            embed.setColor('#59ff00')
            embed.setAuthor(eventLang.embed.author)
            embed.addField(`${ban.user.tag} **---**\`${ban.user.id}\`**---** a été débannis`, `Pour la raison suivante ${ban.reason}`, false)
            embed.setFooter(`Cette action a été réalisée par ${executor!.username} -> id : ${executor!.id}`)

        const channel = ban.guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel.send({
            embeds : [embed]
        })

    }
}