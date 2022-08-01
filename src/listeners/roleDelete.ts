import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import type { TextChannel, Role, ColorResolvable } from "discord.js"
import { LogsEmbed } from "../util/export"
import lang from '../util/language.json'
const eventLang = lang.event.roleRemove
import appConf from "../util/appConfig.json"

export class RoleDelete extends Event {
    constructor(client: ShewenyClient) {
        super(client, "roleDelete", {
            description: eventLang.description,
            once: false,
        });
    }

    async execute(role : Role) {
        const auditLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 32
        })
        const executor = auditLogs.entries.first()!.executor

        let Embed = LogsEmbed(executor!.username, executor!.id)
        Embed.setColor(eventLang.embed.color as ColorResolvable)
        Embed.setAuthor({ name: eventLang.embed.author })
        Embed.addFields({ name: eventLang.embed.fields.roleName.name, value: `${role.name}`, inline: true }, { name: eventLang.embed.fields.roleId.name, value: `${role.id}`, inline: true }, )
        Embed.setFooter({ text: `Cette action a été réalisée par ${executor!.username} -> id : ${executor!.id}` })

        const channel = role.guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel!.send({ embeds: [Embed] })

    }
}