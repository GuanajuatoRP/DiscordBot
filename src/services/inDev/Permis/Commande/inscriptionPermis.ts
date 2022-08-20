// import { ColorResolvable } from 'discord.js';
// import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { AutocompleteInteraction, CommandInteraction, MessageEmbed } from 'discord.js'
// import lang from '../../../../Tools/language.json'
// const cmdLang = lang.commands.inscriptionPermis
// import { PermisTypes } from '../../../Tools/export'

// export class InscriptionPermisCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'inscription-permis',
//             // category: '', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'STRING',
//                     name: 'permis',
//                     description: "cmdLang",
//                     autocomplete : true,
//                     required : true,
//                     }
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             adminsOnly : true, //* Default value is false
//             //userPermissions : [],
//             //clientPermissions : []
//         });
//     }
//     execute(i : CommandInteraction) {
//         this.client.emit('CommandLog', i)
//         if (!Object.values(PermisTypes).map(v => v.toString()).includes(i.options.getString('permis')!)){
//             return i.reply({content: cmdLang.i.wrongName.format(i.options.getString('permis')!)})
//         }

//         const member = i.member as GuildMember
//         let embed = new MessageEmbed()
//             .setTitle(cmdLang.embed.title)
//             .setDescription(cmdLang.embed.description)
//             .setColor(cmdLang.embed.color as ColorResolvable)
//             .setFooter(cmdLang.embed.footer.format(member.user.tag))
//             .setTimestamp()
//             .setThumbnail(member.displayAvatarURL())
//             // TODO : Faire une rquest api pour avoir la fiche personnel de l'utilisateur
//             .addFields(
//                 {name : cmdLang.embed.fields.Nom.name,value: "JeanJack", inline:true},
//                 {name : cmdLang.embed.fields.Prénom.name,value: "GoldMan", inline:true},
//                 {name : cmdLang.embed.fields.Exam.name,value: i.options.getString('permis')!.toString(), inline:false},
//                 {name : cmdLang.embed.fields.Permis.name,value: "Aucun", inline:true},
//                 {name : cmdLang.embed.fields.Pts.name,value: "5", inline:true},
//                 {name : cmdLang.embed.fields.Stages.name,value: "B, C, A", inline:true},
//             )

//         // TODO : Faire une request api pour validé le permis
//         const BtnsPermis = new MessageActionRow()
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(cmdLang.button.labelFail)
//                     .setStyle('DANGER')
//                     .setCustomId('PermisFail')
//             )
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(cmdLang.button.labelOk)
//                     .setStyle('SUCCESS')
//                     .setCustomId('PermisOk')
//             )

//         return i.reply({
//             embeds : [embed],
//             components : [BtnsPermis]
//         })
//     }

//     onAutocomplete(i: AutocompleteInteraction) {
//         const focusedOption = i.options.getFocused(true);
//         let choices : Array<any>;

//         if (focusedOption.name === "permis") {
//             choices = Object.values(PermisTypes)
//         }

//         const filtered = choices!.filter((choice: any) =>
//             choice.startsWith(focusedOption.value)
//         );
//         i
//             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
//     }
// }
