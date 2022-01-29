import { dformat, LogsEmbed, RootPath, today } from './../util/export';
import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { ColorResolvable, CommandInteraction, GuildMember, TextChannel } from "discord.js"
import lang from '../util/language.json'
const eventLang = lang.event.commandLog
import appConf from "../util/appConfig.json"
import fs from 'fs'
import path from 'path'

export class CommandLog extends Event {
    constructor(client: ShewenyClient) {
        super(client, "CommandLog", {
            description: eventLang.description,
            once: false,
        });
    }

    execute(interaction: CommandInteraction) {
        const member = interaction.member as GuildMember
        const Embed = LogsEmbed(member.displayName,member.id)
        Embed.setAuthor(eventLang.embed.author)
        Embed.setColor(eventLang.embed.color as ColorResolvable)
        Embed.fields.push({name: eventLang.embed.fields.commandName.name, value : interaction.commandName, inline: true})
        Embed.fields.push({name: eventLang.embed.fields.salon.name, value : interaction.guild!.channels.cache.get(interaction.channelId)!.name, inline: true})
        Embed.setTimestamp()
        const channel = interaction.guild!.channels.cache.get(appConf.chanels.staff.commandLog) as TextChannel

        //create string of full option dans option value of command
        const commandOptionValue = interaction.options.data.map(o => `Option Name : ${o.name}, value : ${o.value}`).join(', ') as string
        const log = `${dformat}, Command : ${interaction.commandName}, ${commandOptionValue != '' ? `${commandOptionValue}, ` : ''}channel : ${interaction.guild!.channels.cache.get(interaction.channelId)!.name} User : ${member.displayName}, UserID : ${member.id}`

        // send log in txt file
        fs.appendFileSync(path.join(RootPath,"/Json/Logs/commandLog_{0}.txt").format(today), log+'\n')

        // Send Embed log in channellogs on discord
        return channel.send({
            embeds : [Embed]
        })
    }
}