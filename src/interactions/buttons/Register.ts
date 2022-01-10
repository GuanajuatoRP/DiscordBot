import { Button } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { ButtonInteraction, GuildMemberRoleManager, MessageActionRow, MessageButton } from "discord.js"
import appConf from '../../util/appConfig.json'
import { DefaultEmbed } from "../../util/export";
import Lang from '../../util/language.json'
const btLang = Lang.commands.register

export class RegisterBtn extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["Register"]);
    }

    execute(button: ButtonInteraction) {
        // if the user have 'inscrit' role, is potentialy already registred 
        const memberRoles = button.member.roles as GuildMemberRoleManager
        if (memberRoles.cache.has(appConf.Roles.INSCRIT) == true){
            return button.reply({
                content : 'Visiblement vous êtes déjà inscrit vous ne pouvez pas refaire la commande',
                ephemeral : true
            })
        }

            // TODO: call api to get new token with user.id
            const alreadyExist : boolean = true

            
            if (alreadyExist){ //? if good result : 
                const token = 'token'

                // Create response embed
                let embed = DefaultEmbed()
                embed.title = btLang.embed.title
                embed.color = btLang.embed.color as unknown as number
                embed.fields.push({name : btLang.embed.Fields[0].name, value :btLang.embed.Fields[0].value, inline : true})

                // Create Link Button with token
                const btNewAccount = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(btLang.bouton.label)
                        .setStyle('LINK')
                        .setURL('https://localhost/{0}'.format(token))
                )

                // Send Boutton
                button.reply({
                    content : btLang.interaction.sendRegister,
                    ephemeral : true
                })

                // Send Ephemral responce after button in channel
                return button.user.send({
                    embeds : [embed],
                    components : [btNewAccount]
                })

            } else { //? if bad result
                
                return button.reply({
                    content : btLang.interaction.alreadyRegister.content,
                    ephemeral : true
                }) 
            }
            
        }
    }

