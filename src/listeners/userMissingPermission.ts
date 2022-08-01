import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import type { CommandInteraction, GuildMember, TextChannel } from "discord.js"
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
        const executor = interaction.member as GuildMember
        
        const embed = LogsEmbed(executor.displayName, executor.id)
        embed.setAuthor({ name: eventLang.embed.Author, iconURL: executor.user.displayAvatarURL() })
        embed.data.fields!.push({name: eventLang.embed.fields.commandName.name, value : interaction.commandName, inline: true})
        embed.data.fields!.push({name: eventLang.embed.fields.channel.name, value : interaction.guild!.channels.cache.get(interaction.channelId)!.name, inline: true})

        const channel = interaction.guild!.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
        channel.send({
            embeds : [embed]
        })

        return interaction.reply({
            content : eventLang.interaction.content,
            ephemeral : true
        })
    }
}