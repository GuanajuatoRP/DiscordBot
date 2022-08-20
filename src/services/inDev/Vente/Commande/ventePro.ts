// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { CommandInteraction, MessageActionRow, MessageSelectMenu } from 'discord.js'
// import lang from '../../../../Tools/language.json'
// const cmdLang = lang.commands.ventePro

// export class VenteProCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'vente-pro',
//             // category: '', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 // {
//                 //     type : 'STRING',
//                 //     name: 'voiture',
//                 //     description: "cmdLang",
//                 //     autocomplete : false,
//                 //     required : false,
//                 //     }
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             adminsOnly : true, //* Default value is false
//             //userPermissions : [],
//             //clientPermissions : []
//         });
//     }
//     async execute(i : CommandInteraction) {
//         this.client.emit('CommandLog', i)

//         //TODO : Call API pour Get toutes les voiture de l'utilisateur

//         const carMenu = new MessageActionRow()
//             .addComponents(
//                 new MessageSelectMenu()
//                     .setCustomId('VenteProCarMenu')
//                     .setPlaceholder(cmdLang.SelectMenu.setPlaceholder)
//                     .setMaxValues(1)
//                     .addOptions([
//                         {
// 							label: 'Voiture 1',
// 							description: 'Stats',
// 							value: 'Voiture1Id',
// 						},
//                         {
// 							label: 'Voiture 2',
// 							description: 'Stats',
// 							value: 'Voiture2Id',
// 						},
//                     ])
//             )

//         return i.reply({
//             content : cmdLang.i.content,
//             components:[carMenu],
//             ephemeral: true,
//         })
//     }
// }
