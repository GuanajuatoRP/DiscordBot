import { IsAdmin } from './../../util/export';
import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
import {MessageEmbed} from "discord.js"
import lang from "../../util/language.json"
const interactionLang = lang.intercation.button.PermisFail
// import appConfig from '../../util/appConfig.json'

export class Btns extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["PermisFail"]);
    }

    async execute(button: ButtonInteraction) {
        const message = button.message as Message;
        const member = button.member as GuildMember;

        if (!IsAdmin(member,button)){
            return null
        }

        let embed = new MessageEmbed() 
            embed.setColor(interactionLang.embed.color as ColorResolvable)
            embed.setTitle(interactionLang.embed.title)
            embed.setDescription(interactionLang.embed.description)
            embed.setFooter(interactionLang.embed.footer.format(member.user.tag))
            embed.setTimestamp()
        message.react('❌')
        await button.update({embeds : [embed],components : []})
    }
}