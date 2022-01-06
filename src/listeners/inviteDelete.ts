import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { TextChannel , Invite, Guild, ColorResolvable } from "discord.js";
import lang from '../util/language.json'
import { LogsEmbed } from "../util/export";
const eventLang = lang.event.invitationRemove
import appConf from "../util/appConfig.json"

export class InviteDelete extends Event {
    constructor(client: ShewenyClient) {
        super(client, "inviteDelete", {
            description: eventLang.description,
            once: false,
        });
    }

    async execute(invite : Invite) {
        const guild = invite.guild as Guild
        const auditLogs = await guild.fetchAuditLogs({
            limit : 1,
            type : 'INVITE_DELETE'
        })
        const executor = auditLogs.entries.first()!.executor
        

        let Embed = LogsEmbed(executor!.username,executor!.id)
            Embed.setColor(eventLang.embed.color as ColorResolvable)
            Embed.setAuthor(eventLang.embed.author)
            Embed.addFields({ name: eventLang.embed.fields.link.name, value: `${invite.url}`, inline: true }, { name: eventLang.embed.fields.code.name, value: `${invite.code}`, inline: true }, { name: eventLang.embed.fields.salon.name, value: `${invite.channel}`, inline: true }, )

        const channel = guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel!.send({ embeds: [Embed] })

    }
}