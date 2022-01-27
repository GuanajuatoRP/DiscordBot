import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ColorResolvable, GuildMember, MessageActionRow, MessageButton, MessageEmbed, SelectMenuInteraction } from "discord.js";
import lang from '../../util/language.json'
const selectMenuLang = lang.intercation.SelectMenu.VentePersoCarMenu

export class VenteProCarMenuSM extends SelectMenu {
    constructor(client: ShewenyClient) {
        super(client, ["VentePersoCarMenu"]);
    }

    execute(selectMenu: SelectMenuInteraction) {
        const member = selectMenu.member as GuildMember

        let embed = new MessageEmbed()
            .setAuthor(selectMenuLang.embed.Author)
            .setTitle(selectMenuLang.embed.title)
            .setDescription(selectMenuLang.embed.description)
            .setColor(selectMenuLang.embed.color as ColorResolvable)
            .setFooter(selectMenuLang.embed.footer.format(member.user.tag))
            .setTimestamp()
            .setThumbnail(member.displayAvatarURL())
            // TODO : Call API Get this Car Info
            .addFields(
                {name : selectMenuLang.embed.fields.stats.name,value: "xxx", inline:true}
            )

        const btnVentePro = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(selectMenuLang.button.cancel)
                    .setStyle("DANGER")
                    .setCustomId('VenteCarCancel')
            )
            .addComponents(
                new MessageButton()
                    .setLabel(selectMenuLang.button.sell)
                    .setStyle('SUCCESS')
                    .setCustomId('VentePersoCarMenuVendre')
            )

        selectMenu.update({
            content:selectMenuLang.interaction.content,
            components:[]
        })

        selectMenu.channel!.send({
            embeds:[embed],
            components:[btnVentePro]
        })
    }
}