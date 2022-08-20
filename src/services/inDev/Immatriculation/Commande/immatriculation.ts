// import { ColorResolvable } from 'discord.js';
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { AutocompleteInteraction, CommandInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
// import lang from '../../../../tools/language.json'
// import { NewImmatriculation } from '../../../tools/export'
// const cmdLang = lang.commands.immatriculation

// export class ImmatriculationCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'immatriculation',
//             // category: '', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'STRING',
//                     name: 'voiture',
//                     description: cmdLang.slashOptions.voiture,
//                     autocomplete : true,
//                     required : true,
//                 },
//                 {
//                     type : 'STRING',
//                     name: 'immatriculation',
//                     description: cmdLang.slashOptions.immatriculation,
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
//         this.client.emit('CommandLog', interaction)

//         const immatLenght = 9
//         let immat = interaction.options.getString('immatriculation') != null ? interaction.options.getString('immatriculation') : ""
//         const member = interaction.member as GuildMember
//         const carList = ["Voitue1", "Voitue2", "Car1", "Car2", "Machin1"]

//         immat = NewImmatriculation(immat as string,immatLenght)

//         if (!carList.includes(interaction.options.getString('voiture') as string)){
//             return interaction.reply({
//                 content:cmdLang.interaction.wrongName.format(interaction.options.getString('voiture') as string),
//                 ephemeral: true
//             })
//         } else if (immat.length != immatLenght){
//             return interaction.reply({
//                 content:immat,
//                 ephemeral: true
//             })
//         }

//         const embed = new MessageEmbed()
//             .setAuthor(cmdLang.embed.Author)
//             .setTitle(interaction.options.getString('voiture') as string)
//             .setColor(cmdLang.embed.color as ColorResolvable)
//             .setTimestamp()
//             .setThumbnail(member.displayAvatarURL())
//             .setFooter(cmdLang.embed.footer.format(member.user.tag))
//             .addFields(
//                 {name: cmdLang.embed.fields.stats.name, value:"xxx"},
//                 {name: cmdLang.embed.fields.immat.name, value:immat},
//                 {name: cmdLang.embed.fields.prix.name, value:"1000€"}
//             )

//         const btnsImmatriculation = new MessageActionRow()
//         .addComponents(
//             new MessageButton()
//                 .setLabel(cmdLang.button.cancel)
//                 .setStyle("DANGER")
//                 .setCustomId('ImmatriculationCancel')
//         )
//         .addComponents(
//             new MessageButton()
//                 .setLabel(cmdLang.button.reload)
//                 .setStyle('PRIMARY')
//                 .setCustomId('ImmatriculationReload')
//         )
//         const btImmatriculatioBuy = new MessageActionRow()
//         .addComponents(
//             new MessageButton()
//                 .setLabel(cmdLang.button.buy)
//                 .setStyle('SUCCESS')
//                 .setCustomId('ImmatriculationBuy')
//         )

//         return interaction.reply({
//             embeds: [embed],
//             components:[btnsImmatriculation,btImmatriculatioBuy]
//         })
//     }

//     onAutocomplete(interaction: AutocompleteInteraction) {
//         const focusedOption = interaction.options.getFocused(true);
//         let choices : Array<any>;

//         // TODO Get member.CarList
//         if (focusedOption.name === "voiture") {
//             choices = ["Voitue1", "Voitue2", "Car1", "Car2", "Machin1"];
//         }

//         const filtered = choices!.filter((choice: any) =>
//             choice.startsWith(focusedOption.value)
//         );
//         interaction
//             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
//     }
// }
