
import { Button } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { ButtonInteraction, GuildMember, GuildMemberRoleManager} from "discord.js"
import appConf from '../../util/appConfig.json'

// import { DefaultEmbed } from "../../util/export";
// import Lang from '../../util/language.json'
// const btLang = Lang.commands.register
import ApiAuth from '../../AccessApi/ApiAuth'
// import fetch from "node-fetch"
export class RegisterBtn extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["Register"]);
    }

    async execute(button: ButtonInteraction) {
        // if the user have 'inscrit' role, is potentialy already registred 
        const member = button.member as GuildMember
        const memberRoles = member.roles as GuildMemberRoleManager
        if (memberRoles.cache.has(appConf.Roles.INSCRIT) == true){
            return button.reply({
                content : 'Visiblement vous êtes déjà inscrit vous ne pouvez pas refaire la commande',
                ephemeral : true
            })
        }

        // TODO: call api to get new token with user.id

        //* axios POST request
        const {data} = await ApiAuth.register(member.displayName,member.id)
        console.log(data);
        // axi.post('http://localhost:49154/register', {username: "Dercraker", discordid: "152125692618735616"})
        // .then((res) => {
        // Get token in response
        // const token = res.data.message as string
        // const token = res.data.message as string
        // console.log(token)
        //  // Create response embed
        // let embed = DefaultEmbed()
        // embed.title = btLang.embed.title
        // embed.color = btLang.embed.color as unknown as number
        // embed.fields.push({name : btLang.embed.Fields[0].name, value :btLang.embed.Fields[0].value, inline : true})

        // // Create Link Button with token
        // const btNewAccount = new MessageActionRow()
        // .addComponents(
        //     new MessageButton()
        //         .setLabel(btLang.bouton.label)
        //         .setStyle('LINK')
        //         .setURL('https://localhost/{0}'.format(token))
        // )

        
        // // Send Ephemral responce after button in channel
        // button.reply({
        //     content : btLang.interaction.sendRegister,
        //     ephemeral : true
        // })

        // // Send Boutton and embed to user DM's
        // return button.user.send({
        //     embeds : [embed],
        //     components : [btNewAccount]
        // })
        // })
        // .catch((err) => {
        //     console.log(err);
        // console.log(err.message);
        // return button.reply({
        //     content : err.message,
        //     ephemeral : true
        // }) 
        // })
        // }
    }
}
