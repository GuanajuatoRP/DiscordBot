import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import type { CommandInteraction, TextChannel } from "discord.js"
import lang from '../util/language.json'
import { LogsEmbed } from "../util/export"
import appConf from "../util/appConfig.json"
const eventLang = lang.event.userMissingPermission

export class userMissingPermissions extends Event {
    constructor(client: ShewenyClient) {
        super(client, "userMissingPermissions", {
            description: eventLang.description,
            emitter : client.managers.commands,
            once: false,
        });
    }

    execute(interaction : CommandInteraction )
    {
        const executor = interaction.user
        
        const embed = LogsEmbed()
        embed.setAuthor('User Not Have Permission')
        embed.fields.push({name: "Nom de la commande", value : interaction.commandName, inline: true})
        embed.fields.push({name: "Salon d'utilisation", value : interaction.guild!.channels.cache.get(interaction.channelId)!.name, inline: true})
        embed.setFooter(`Cette action a été réalisée par ${executor!.username} -> id : ${executor!.id}`)
        const channel = interaction.guild!.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel.send({
            embeds : [embed]
        })
        return interaction.reply({
            content : eventLang.interaction.content,
            embeds : [embed],
            ephemeral : true
        })
    }
}