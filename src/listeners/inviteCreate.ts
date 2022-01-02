import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { TextChannel , Invite, Guild } from "discord.js";
import lang from '../util/language.json'
import { LogsEmbed } from "../util/export";
const eventLang = lang.event.invitationCreate
import appConf from "../util/appConfig.json"

export class InviteCreate extends Event {
    constructor(client: ShewenyClient) {
        super(client, "inviteCreate", {
            description: "",
            once: false,
        });
    }

    async execute(invite : Invite) {
        const guild = invite.guild as Guild
        const auditLogs = await guild.fetchAuditLogs({
            limit : 1,
            type : 'INVITE_CREATE'
        })
        const executor = auditLogs.entries.first()!.executor
        

        let Embed = LogsEmbed()
            Embed.setColor('#A600FF')
            Embed.setAuthor(eventLang.embed.author)
            Embed.addFields({ name: 'URL du lien', value: `${invite.url}`, inline: true }, { name: `Code de l'invitation`, value: `${invite.code}`, inline: true }, { name: `Salons visé par l'invitation`, value: `${invite.channel}`, inline: true }, )
            Embed.setFooter(`Cette action a été réalisée par ${executor!.username} -> id : ${executor!.id}`)

        const channel = guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel!.send({ embeds: [Embed] })

    }
}