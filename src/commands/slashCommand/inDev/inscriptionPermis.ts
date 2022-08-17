// import { ColorResolvable } from 'discord.js';
// import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { AutocompleteInteraction, CommandInteraction, MessageEmbed } from 'discord.js'
// import lang from '../../../tools/language.json'
// const CommandLang = lang.commands.inscriptionPermis
// import { PermisTypes } from '../../../util/export'

// export class InscriptionPermisCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'inscription-permis',
//             // category: '', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: CommandLang.description.desc,
//             usage : CommandLang.description.usage,
//             examples : CommandLang.description.exemples,
//             options : [
//                 {
//                     type : 'STRING',
//                     name: 'permis',
//                     description: "CommandLang",
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
//             return interaction.reply({content: CommandLang.interaction.wrongName.format(interaction.options.getString('permis')!)})
//         }

//         const member = interaction.member as GuildMember
//         let embed = new MessageEmbed()
//             .setTitle(CommandLang.embed.title)
//             .setDescription(CommandLang.embed.description)
//             .setColor(CommandLang.embed.color as ColorResolvable)
//             .setFooter(CommandLang.embed.footer.format(member.user.tag))
//             .setTimestamp()
//             .setThumbnail(member.displayAvatarURL())
//             // TODO : Faire une rquest api pour avoir la fiche personnel de l'utilisateur
//             .addFields(
//                 {name : CommandLang.embed.fields.Nom.name,value: "JeanJack", inline:true},
//                 {name : CommandLang.embed.fields.Prénom.name,value: "GoldMan", inline:true},
//                 {name : CommandLang.embed.fields.Exam.name,value: interaction.options.getString('permis')!.toString(), inline:false},
//                 {name : CommandLang.embed.fields.Permis.name,value: "Aucun", inline:true},
//                 {name : CommandLang.embed.fields.Pts.name,value: "5", inline:true},
//                 {name : CommandLang.embed.fields.Stages.name,value: "B, C, A", inline:true},
//             )

//         // TODO : Faire une request api pour validé le permis
//         const BtnsPermis = new MessageActionRow()
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(CommandLang.button.labelFail)
//                     .setStyle('DANGER')
//                     .setCustomId('PermisFail')
//             )
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(CommandLang.button.labelOk)
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
