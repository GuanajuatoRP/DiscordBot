import { DefaultEmbed, LogsEmbed } from './../../util/export';
import { Button } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { ButtonInteraction, GuildMember, GuildMemberRoleManager, MessageActionRow, MessageButton, TextChannel} from "discord.js"
import appConf from '../../util/appConfig.json'
import ApiAuth from '../../AccessApi/ApiAuth'
import lang from "../../util/language.json"
const interactionLang = lang.intercation.button.register
export class RegisterBtn extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["Register"]);
    }

    async execute(button: ButtonInteraction) {
        const member = button.member as GuildMember
        const memberRoles = member.roles as GuildMemberRoleManager
        if (memberRoles.cache.has(appConf.Roles.INSCRIT) == true){
            return button.reply({
                content : 'Visiblement vous êtes déjà inscrit vous ne pouvez pas refaire la commande',
                ephemeral : true
            })
        }


        //* axios POST request
        ApiAuth.register(member.displayName,member.id)
            .then(async (res) => {
                const member = button.member as GuildMember
                let embed = DefaultEmbed()
                    embed.setDescription(interactionLang.embedGoodResponse.description)

                const btLink = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(interactionLang.button.label)
                        .setStyle('LINK')
                        .setURL(appConf.Api.RegisterLink.format(res.data.message))
                )
                
                await button.reply({
                    content:interactionLang.buttonReply.content,
                    ephemeral : true,
                })
                return setTimeout(() => {
                    member.send({
                        embeds:[embed],
                        components:[btLink]
                    })
                },2000)
                
            })
            .catch(async (err) => {

                let embed = LogsEmbed(member.displayName,member.id)
                    embed.setAuthor(interactionLang.embedError.author)
                    embed.setDescription(interactionLang.embedError.description)
                    embed.addField(interactionLang.embedError.field.Err.name,err.message)
                    embed.addField(interactionLang.embedError.field.ErrMess.name,err.response.data.message)

                const logBotChannel = button.guild!.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
                await logBotChannel.send({
                    embeds:[embed]
                })

                return button.reply({
                    content : interactionLang.buttonReply2.content,
                    ephemeral : true
                }) 
            })
    }
}
