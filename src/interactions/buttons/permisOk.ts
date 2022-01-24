import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
import {MessageEmbed} from "discord.js"
import lang from "../../util/language.json"
const interactionLang = lang.interaction.PermisOk
// import appConfig from '../../util/appConfig.json'

export class Btns extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["PermisOk"]);
    }

    async execute(button: ButtonInteraction) {
        const message = button.message as Message;
        const member = button.member as GuildMember
        let embed = new MessageEmbed() 
            embed.setColor(interactionLang.embed.color as ColorResolvable)
            embed.setTitle(interactionLang.embed.title)
            embed.setDescription(interactionLang.embed.description)
            embed.setFooter(interactionLang.embed.footer.format(member.user.tag))
            embed.setTimestamp()
            embed.setThumbnail(member.displayAvatarURL())
            // TODO : Faire une rquest api pour avoir la fiche personnel de l'utilisateur 
            .addFields(
                {name : "Prénom",value: "JeanJack", inline:true},
                {name : "Nom",value: "GoldMan", inline:true},
                {name : "Permis Obtenus",value: button.message.embeds[0].fields![2].value, inline:false},
                {name : "Points sur le nouveau permis",value: "12", inline:true}
            )
        await button.update({embeds : [embed],components : []})
        message.react('✅')
    }
}