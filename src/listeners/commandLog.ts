import { Event } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { CommandInteraction, GuildMember, MessageEmbed, TextChannel } from "discord.js"
import lang from '../util/language.json'
const eventLang = lang.event.CommandLog
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
        const Embed = new MessageEmbed()
        Embed.setAuthor('Command Log')
        Embed.setColor('#ff0000')
        Embed.fields.push({name: "Nom de la commande", value : interaction.commandName, inline: true})
        Embed.fields.push({name: "Salon d'utilisation", value : interaction.guild!.channels.cache.get(interaction.channelId)!.name, inline: true})
        Embed.setFooter(`Cette action a été réalisée par ${member.displayName} -> id : ${member.id}`)
        Embed.setTimestamp()
        const channel = interaction.guild!.channels.cache.get(appConf.chanels.staff.commandLog) as TextChannel

        const d = new Date
        const today = [d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`,d.getMonth()+1 > 9 ? d.getMonth() : `0${d.getMonth()+1}`,d.getFullYear()].join('-')
        const dformat = today+' '+[d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`,d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`,d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`].join(':');
        
        const commandOptionValue = interaction.options.data.map(o => `Option Name : ${o.name}, value : ${o.value}`).join(', ') as string
        const log = `${dformat}, Command : ${interaction.commandName}, ${commandOptionValue != '' ? `${commandOptionValue}, ` : ''}channel : ${interaction.guild!.channels.cache.get(interaction.channelId)!.name} User : ${member.displayName}, UserID : ${member.id}`
        fs.appendFileSync(path.join(__dirname,`../util/logs/commandLog_${today}.txt`), log+'\n')
        return channel.send({
            embeds : [Embed]
        })
    }
}