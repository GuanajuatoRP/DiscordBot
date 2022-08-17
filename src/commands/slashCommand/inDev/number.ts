// import { Command } from "sheweny"
// import type { ShewenyClient } from "sheweny"
// import type { CommandInteraction } from "discord.js"
// import lang from '../../../tools/language.json'
// import { DefaultEmbed } from "../../../util/export"
// const cmdLang = lang.commands.number

// export class NumberCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'number',
//             category: 'Misc', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'NUMBER',
//                     name: 'nbval',
//                     description: cmdLang.slashOptions.nbval.description,
//                     autocomplete : false,
//                     required : true,
//                 },
//                 {
//                     type : 'NUMBER',
//                     name: 'plage',
//                     description: cmdLang.slashOptions.plage.description,
//                     autocomplete : false,
//                     required : true,
//                 },
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             // adminsOnly : , //* Default value is false
//             // userPermissions : [],
//             // clientPermissions : []
//         });
//     }
//     execute(interaction : CommandInteraction) {
//         this.client.emit('CommandLog', interaction as CommandInteraction)

//         const nbval : number = interaction.options.getNumber('nbval')!
//         const plage : number = interaction.options.getNumber('plage')!

//         if (nbval > plage) {
//             return interaction.reply({
//                 content: cmdLang.messageError,
//                 ephemeral: true
//             })
//         }
//         let result : Array<Number> = new Array<Number>();
//         let nb : number
//         for (let i = 0; i < nbval; i++) {
//             do {
//                 //Get random number between 1 and max (plage)
//                 nb = Math.floor(Math.random() * (plage - 1 + 1) + 1)
//             } while (result.includes(nb));
//             result.push(nb)
//         }
//         result.sort((a : any, b : any) => {
//             return a - b;
//         })
//         let embed = DefaultEmbed()
//             embed.title = ``.format(nbval === 1 ? '':'s',plage.toString())
//             embed.fields.push({name: `${nbval === 1 ? 'La valeur':'Liste des valeurs'}`, value : result.join(','), inline : true})
//         return interaction.reply({
//             embeds: [embed]
//         });
//     }
// }
