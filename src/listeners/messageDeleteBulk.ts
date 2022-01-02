import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { LogsEmbed } from "../util/export"
import lang from '../util/language.json'
import { Guild, TextChannel } from "discord.js";
const eventLang = lang.event.messageBulkDelete
import appConf from "../util/appConfig.json"

export class MessageDeleteBulk extends Event {
    constructor(client: ShewenyClient) {
        super(client, "messageDeleteBulk", {
            description: eventLang.description,
            once: false,
        });
    }

    async execute(messages : any) {
        const guild = this.client.guilds.cache.get(messages.first().guildId) as Guild

        let Embed = LogsEmbed()
            Embed.setColor('#FF631A')
            Embed.setAuthor(eventLang.embed.author)
            Embed.addFields({ name: 'Salons d\`utilisation', value: `${guild.channels.cache.get(messages.first().channelId)!.name}`, inline: true }, /*{ name: `Nombre de messages suprimer`, value: `$`, inline: true }, */ )
            Embed.setFooter('')

        const channel = guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel.send({ embeds: [Embed] })

    }
}