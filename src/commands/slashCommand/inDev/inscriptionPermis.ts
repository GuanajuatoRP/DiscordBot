// import { ColorResolvable } from 'discord.js';
// import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { AutocompleteInteraction, CommandInteraction, MessageEmbed } from 'discord.js'
// import lang from '../../../tools/language.json'
// const cmdLang = lang.commands.inscriptionPermis
// import { PermisTypes } from '../../../tools/export'

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
//     execute(interaction : CommandInteraction) {
//         this.client.emit('CommandLog', interaction)
//         if (!Object.values(PermisTypes).map(v => v.toString()).includes(interaction.options.getString('permis')!)){
//             return interaction.reply({content: cmdLang.interaction.wrongName.format(interaction.options.getString('permis')!)})
//         }

//         const member = interaction.member as GuildMember
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
//                 {name : cmdLang.embed.fields.Exam.name,value: interaction.options.getString('permis')!.toString(), inline:false},
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

//         return interaction.reply({
//             embeds : [embed],
//             components : [BtnsPermis]
//         })
//     }

//     onAutocomplete(interaction: AutocompleteInteraction) {
//         const focusedOption = interaction.options.getFocused(true);
//         let choices : Array<any>;

//         if (focusedOption.name === "permis") {
//             choices = Object.values(PermisTypes)
//         }

//         const filtered = choices!.filter((choice: any) =>
//             choice.startsWith(focusedOption.value)
//         );
//         interaction
//             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
//     }
// }
