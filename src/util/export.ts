import { GuildMember, CommandInteraction, TextChannel } from 'discord.js';
import { MessageActionRow, MessageSelectMenu, MessageEmbed } from 'discord.js'
import fs from 'fs'
import path from 'path'
const lang = require('./language.json')
const cemLang = lang.embeds.CustomEmbedMenu
import appConf from '../util/appConfig.json'

export const saveEmbed = (embed:MessageEmbed) => {
    fs.writeFile(path.join(__dirname, './customEmbed.json'), JSON.stringify(embed), function writeJSON(err) {
        if (err) return console.log(err);
    })
}

export const CustomEmbedMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId(cemLang.customId)
        .setPlaceholder(cemLang.placeHolder)
        .addOptions([{
                label: cemLang.Options[0].label,
                description: cemLang.Options[0].description,
                value: cemLang.Options[0].value
            },
            {
                label: cemLang.Options[1].label,
                description: cemLang.Options[1].description,
                value: cemLang.Options[1].value,
            },
            {
                label: cemLang.Options[2].label,
                description: cemLang.Options[2].description,
                value: cemLang.Options[2].value
            },
            {
                label: cemLang.Options[3].label,
                description: cemLang.Options[3].description,
                value: cemLang.Options[3].value,
            }, {
                label: cemLang.Options[4].label,
                description: cemLang.Options[4].description,
                value: cemLang.Options[4].value,
            },
            {
                label: cemLang.Options[5].label,
                description: cemLang.Options[5].description,
                value: cemLang.Options[5].value,
            },
            {
                label: cemLang.Options[6].label,
                description: cemLang.Options[6].description,
                value: cemLang.Options[6].value,
            }, {
                label: cemLang.Options[7].label,
                description: cemLang.Options[7].description,
                value: cemLang.Options[7].value,
            }
        ])
    )

export const DefaultEmbed = () => {
        return new MessageEmbed().setAuthor(lang.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setColor('#ff8000').setFooter(lang.embeds.default.footer, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg").setTimestamp().addFields()
    }
export const LogsEmbed = () => {
        return new MessageEmbed().setAuthor(lang.embeds.LogsEmbed.author).setColor('#ff0000').setFooter(lang.embeds.LogsEmbed.footer).setTimestamp()
    }
export const CommandLog = (member : GuildMember, interaction: CommandInteraction) => {
    const Embed = new MessageEmbed()
        Embed.setAuthor('Command Log')
        Embed.setColor('#ff0000')
        Embed.fields.push({name: "Nom de la commande", value : interaction.commandName, inline: true})
        Embed.fields.push({name: "Salon d'utilisation", value : interaction.guild!.channels.cache.get(interaction.channelId)!.name, inline: true})
        Embed.setFooter(`Cette action a été réalisée par ${member.nickname != null ? member.nickname : member.user.username} -> id : ${member.id}`)
        Embed.setTimestamp()
    const channel = interaction.guild!.channels.cache.get(appConf.chanels.staff.commandLog) as TextChannel

    const d = new Date
    const dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
    
    const log = `${dformat}, Command : ${interaction.commandName}, channel : ${interaction.guild!.channels.cache.get(interaction.channelId)!.name} User : ${member.nickname != null ? member.nickname : member.user.username}, UserID : ${member.id}`

    fs.appendFileSync(path.join(__dirname,'/commandLog.txt'), log+'\n')

    return channel.send({
        embeds : [Embed]
        })
}

export const ChannelObject = {
    name: String,
    channelInfo : {
        type : String,
        topic : String,
        permissionsList : Array,
        position : Number,
        userLimit : Number
    },
    messages : Array
}