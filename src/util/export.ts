import { MessageActionRow, MessageSelectMenu, MessageEmbed } from 'discord.js'
import fs from 'fs'
import path from 'path'
const lang = require('./language.json')
const cemLang = lang.embeds.CustomEmbedMenu

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