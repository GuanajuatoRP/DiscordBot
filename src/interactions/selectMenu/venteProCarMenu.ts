import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ColorResolvable, GuildMember, MessageActionRow, MessageButton, MessageEmbed, SelectMenuInteraction } from "discord.js";
import lang from '../../util/language.json'
const selectMenuLang = lang.intercation.SelectMenu.VenteProCarMenu

export class VenteProCarMenuSM extends SelectMenu {
    constructor(client: ShewenyClient) {
        super(client, ["VenteProCarMenu"]);
    }

    execute(selectMenu: SelectMenuInteraction) {
        const member = selectMenu.member as GuildMember

        // TODO check si member est le responsable de la demande 
        
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
        
        const btValider = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(selectMenuLang.button.label)
                    .setStyle('SUCCESS')
                    .setCustomId('VenteProCarMenuVendre')
            )
        
        selectMenu.update({
            embeds:[embed],
            components:[btValider]
        })
    }
}