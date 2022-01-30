import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import type { Role, ColorResolvable } from "discord.js"
import { LogsEmbed } from "../util/export"
import lang from '../util/language.json'
const eventLang = lang.event.roleRemove

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
            type: 'ROLE_DELETE'
        })
        const executor = auditLogs.entries.first()!.executor

        let Embed = LogsEmbed(executor!.username, executor!.id)
        Embed.setColor(eventLang.embed.color as ColorResolvable)
        Embed.setAuthor(eventLang.embed.author)
        Embed.addFields({ name: eventLang.embed.fields.roleName.name, value: `${role.name}`, inline: true }, { name: eventLang.embed.fields.roleId.name, value: `${role.id}`, inline: true }, )
        Embed.setFooter(`Cette action a été réalisée par {0} -> id : {1}`.format(executor!.username,executor!.id))

        this.client.on('',)
        //! const channel = role.guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        //! channel!.send({ embeds: [Embed] })

    }
}