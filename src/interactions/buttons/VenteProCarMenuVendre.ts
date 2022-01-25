import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
import {MessageEmbed} from "discord.js"
import lang from "../../util/language.json"
const interactionLang = lang.intercation.button.VenteProCarMenuVendre
// import appConfig from '../../util/appConfig.json'

export class VenteProCarMenuVendreBtns extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["VenteProCarMenuVendre"]);
    }

    async execute(button: ButtonInteraction) {
        const message = button.message as Message;
        const messageEmbed = message.embeds[0]
        const member = button.member as GuildMember

        // TODO Check si member est l'embed 'owner'
        // if (!IsAdmin(member,button)){
        //     return null
        // }

        let Newembed = new MessageEmbed() 
            .setAuthor(messageEmbed.author!.name)
            .setTitle(interactionLang.embed.title)
            .setDescription(messageEmbed.description!)
            .setColor(interactionLang.embed.color as ColorResolvable)
            .setFooter(messageEmbed.footer!.text)
            .setTimestamp()
            .setThumbnail(member.displayAvatarURL())
            .addFields(
                {name : interactionLang.embed.fields.Vente.name.format(member.displayName),value: interactionLang.embed.fields.Vente.value.format("1000"), inline:true}
            )
        message.react('✅')

        // TODO Call API Vendre la voiture et faire la transaction
        
        await button.update({embeds : [Newembed],components : []})
    }
}