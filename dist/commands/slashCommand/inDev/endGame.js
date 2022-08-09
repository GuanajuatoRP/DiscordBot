"use strict";
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import type { CommandInteraction, CategoryChannel } from 'discord.js'
// import lang from '../../../util/language.json'
// const cmdLang = lang.commands.endgame
// import appConfig from '../../../util/appConfig.json'
// export class EndGameCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'endgame',
//             category: 'Admin', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 // {
//                     //    type : 'STRING',
//                     // name: 'commande',
//                     // description: '',
//                     // autocomplete : false,
//                     // required : false,
//                     // }
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
//         const cat = interaction.guild!.channels.cache.get(appConfig.chanels.game.categorie)! as CategoryChannel
//         if (cat.type !== 'GUILD_CATEGORY' ){
//             interaction.reply({
//                 content : 'Catégorie non trouvé',
//                 ephemeral: true
//             })
//         }
//         cat!.children.forEach((child : any) => {
//             if (child.id != appConfig.chanels.game.admin && child.id != appConfig.chanels.game.salleDeJeux){
//                 this.client.channels.cache.get(child.id)!.delete()
//             }
//         });
//         const RoleA = interaction.guild!.roles.cache.get(appConfig.Roles.GMA);
//         RoleA!.members.forEach(member => {
//             member.roles.remove(RoleA!);
//         });
//         const RoleB = interaction.guild!.roles.cache.get(appConfig.Roles.GMB);
//         RoleB!.members.forEach(member => {
//             member.roles.remove(RoleB!);
//         });
//         return interaction.reply({
//             content : cmdLang.interaction.content,
//             ephemeral : true
//         }) 
//     }
// }
