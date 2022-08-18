// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { CommandInteraction, MessageActionRow, MessageSelectMenu } from 'discord.js'
// import lang from '../../../../tools/language.json'
// const cmdLang = lang.commands.ventePerso

// export class VentePersoCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'vente-perso',
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
//     async execute(interaction : CommandInteraction) {
//         this.client.emit('CommandLog', interaction)

//         //TODO : Call API pour Get toutes les voiture de l'utilisateur

//         const carMenu = new MessageActionRow()
//             .addComponents(
//                 new MessageSelectMenu()
//                     .setCustomId('VentePersoCarMenu')
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

//         return interaction.reply({
//             content : cmdLang.interaction.content,
//             components:[carMenu],
//             ephemeral: true,
//         })
//     }
// }
