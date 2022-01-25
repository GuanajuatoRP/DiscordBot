import { DefaultEmbed, LogsEmbed } from './../../util/export';
import { Button } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { ButtonInteraction, GuildMember, GuildMemberRoleManager, MessageActionRow, MessageButton, Role, TextChannel} from "discord.js"
import appConf from '../../util/appConfig.json'
import ApiAuth from '../../AccessApi/ApiAuth'
import lang from "../../util/language.json"
const interactionLang = lang.intercation.button.register
export class RegisterBtn extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["Register"]);
    }

    async execute(button: ButtonInteraction) {
        // Get Member and this roles
        const member = button.member as GuildMember
        const memberRoles = member.roles as GuildMemberRoleManager
        const RoleInscrit = button.guild!.roles.cache.get(appConf.Roles.INSCRIT) as Role
        let userExists = false

        // Check if this user is already registred
        await ApiAuth.UserExist(member.id)
        .then(() => {
            userExists = true
        })
        .catch(() => {
            userExists = false
        })
        if (memberRoles.cache.has(appConf.Roles.INSCRIT) == true || userExists){
            memberRoles.add(RoleInscrit)
            return button.reply({
                content : interactionLang.AlreadyRegistred,
                ephemeral : true
            })
        }


        // Call Api on register endpoint to create a new token with user.id
        ApiAuth.register(member.displayName,member.id)
            .then(async (res) => {
                // Create new embed and button link to send in dm on member 
                let embed = DefaultEmbed()
                    embed.setDescription(interactionLang.embedGoodResponse.description)

                const btLink = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(interactionLang.button.label)
                        .setStyle('LINK')
                        .setURL(appConf.Api.RegisterLink.format(res.data.message))
                )

                // Explain at member the futur new DM
                await button.reply({
                    content:interactionLang.buttonReply.content,
                    ephemeral : true,
                })

                // After 2Sec send DM
                return setTimeout(() => {
                    member.send({
                        embeds:[embed],
                        components:[btLink]
                    })
                },2000)
                
            })
            .catch(async (err) => {
                // Create Embed With Error Informations
                let embed = LogsEmbed(member.displayName,member.id)
                    embed.setAuthor(interactionLang.embedError.author)
                    embed.setDescription(interactionLang.embedError.description)
                    embed.addField(interactionLang.embedError.field.Err.name,err.message)
                    embed.addField(interactionLang.embedError.field.ErrMess.name,err.response.data.message)

                // Get the channel named LogBot and send Embed into this channel
                const logBotChannel = button.guild!.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
                await logBotChannel.send({
                    embeds:[embed]
                })

                // Send lambda Error Message to user
                return button.reply({
                    content : interactionLang.buttonReply2.content,
                    ephemeral : true
                }) 
            })
    }
}
