import { IsEmbedOwner } from './../../util/export';
import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, GuildMember, Message, MessageEmbed } from "discord.js";
import lang from "../../util/language.json"
const interactionLang = lang.intercation.button.ImmatriculationCancel

export class ImmatriculationCancelBtn extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["ImmatriculationCancel"]);
    }

    execute(button: ButtonInteraction) {
        const message = button.message as Message
        const messageEmbed = message.embeds[0] as MessageEmbed
        const member = button.member as GuildMember

        // check if member can user button
        if (!IsEmbedOwner(member,messageEmbed)){
            return button.reply({
                content:interactionLang.button.cantUse,
                ephemeral:true,
            })
        }

        message.delete()

        return button.reply({
            content:interactionLang.interraction,
            ephemeral : true
        })
    }
}