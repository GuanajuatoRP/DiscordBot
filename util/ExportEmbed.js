const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const lang = require('./language.json')
const cemLang = lang.embeds.CustomEmbedMenu


const DefaultEmbed = new MessageEmbed()
    .setAuthor(lang.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setDescription('').setColor('#ff8000').setFooter(lang.embeds.default.footer, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg").setTimestamp().addFields()

const CustomEmbedMenu = new MessageActionRow()
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
module.exports = {
    DefaultEmbed: DefaultEmbed,
    LogsEmbed: function() {
        return new MessageEmbed().setAuthor(lang.embeds.LogsEmbed.author).setColor('#ff0000').setFooter(lang.embeds.LogsEmbed.footer).setTimestamp()
    },
    EmbedMenu: CustomEmbedMenu
}