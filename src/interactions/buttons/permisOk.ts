import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, GuildMember } from "discord.js";
import {MessageEmbed} from "discord.js"
// import appConfig from '../../util/appConfig.json'

export class Btns extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["PermisOk"]);
    }

    async execute(button: ButtonInteraction) {
        const member = button.member as GuildMember
        let embed = new MessageEmbed() 
            embed.setColor('DARK_GREEN')
            embed.setTitle('Validation du permis')
            embed.setDescription('La ville de guanajuato vous félicite pour votre permis !!')
            embed.setFooter("Validation du permis de : {0}".format(member.user.tag))
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
        
    }
}