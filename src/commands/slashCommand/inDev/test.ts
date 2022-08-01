// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import type { CommandInteraction } from 'discord.js'
// // import lang from '../../../util/language.json'
// // const CommandLang = lang.commands.test



// export class TestCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'test',
//             // category: '', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: 'CommandLang.description.desc',
//             usage : 'CommandLang.description.usage',
//             examples : 'CommandLang.description.exemples',
//             options : [
//                 // {
//                     // type : 'STRING',
//                     // name: 'commande',
//                     // description: CommandLang,
//                     // autocomplete : false,
//                     // required : false,
//                     //}
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
//         this.client.emit('CommandLog', interaction)

//         this.client.collections.commands.get('help')!.execute(interaction)

//         // return interaction.reply({
//         //     content : 'test'
//         // }) 
//     }

// //     onAutocomplete(interaction: AutocompleteInteraction) {
// //         const focusedOption = interaction.options.getFocused(true);
// //         let choices : Array<any>;
// //     
// //         if (focusedOption.name === "name") {
// //             choices = ["faq", "install", "collection", "promise", "debug"];
// //         }
// //     
// //         if (focusedOption.name === "theme") {
// //             choices = ["halloween", "christmas", "summer"];
// //         }
// //     
// //         const filtered = choices!.filter((choice: any) =>
// //             choice.startsWith(focusedOption.value)
// //         );
// //         interaction
// //             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
// //     }
// }