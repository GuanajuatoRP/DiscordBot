// import { DefaultEmbed } from './../../../util/export';
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
// import lang from '../../../util/language.json'
// const cmdLang = lang.commands.register



// export class RegisterCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'register',
//             // category: 'Misc', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'STRING',
//                     name: 'username',
//                     description: 'Définis le nom du compte',
//                     autocomplete : false,
//                     required : false,
//                 }
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             adminsOnly : true, //* Default value is false 
//             //userPermissions : [],
//             //clientPermissions : []
//         });
//     }
//     execute(interaction : CommandInteraction) {
//         this.client.emit('CommandLog', interaction as CommandInteraction)
        
//         // TODO: créé une requête dans le but de get la liste des user sur la bd puis check si userlist.include intercation.user
//         const userAlreadyregister : Boolean = false 
//         if (userAlreadyregister){
//             return interaction.reply({
//                 content : cmdLang.interaction.alreadyRegister.content,
//                 ephemeral : true
//             }) 
//         } else {
            
//             // TODO: API call pour request un token d'authentification
//             const token = interaction.options.getString('username')
//             let embed = DefaultEmbed()
//                 embed.title = cmdLang.embed.title
//                 embed.color = cmdLang.embed.color as unknown as number
//                 embed.fields.push({name : cmdLang.embed.Fields[0].name, value :cmdLang.embed.Fields[0].value, inline : true})

//             const btNewAccount = new MessageActionRow()
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(cmdLang.bouton.label)
//                     .setStyle('PRIMARY')
//                     .setCustomId('Register')
//             )

//             interaction.reply({
//                 content : cmdLang.interaction.sendRegister,
//                 components : [btNewAccount],
//                 // ephemeral : true
//             })
//             return interaction.user.send({
//                 content : token,
//                 embeds : [embed],
//                 components : [btNewAccount]
//             })
//         }
//     }
// }