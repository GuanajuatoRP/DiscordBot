// import { SelectMenu } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import { GuildMember, MessageActionRow, MessageButton, MessageEmbed, SelectMenuInteraction } from "discord.js";
// import lang from '../../tools/language.json'
// import { IsEmbedOwner } from "../../Util/export";
// const selectMenuLang = lang.intercation.SelectMenu.AchatPersoCarMenu

// export class ventePersoCarMenuVendreSM extends SelectMenu {
//     constructor(client: ShewenyClient) {
//         super(client, ["VentePersoCarMenuVendreUser"]);
//     }

//     execute(selectMenu: SelectMenuInteraction) {
//         const member = selectMenu.member as GuildMember
//         const messageEmbed = selectMenu.message.embeds[0] as MessageEmbed

//         // check if member can user button
//         if (!IsEmbedOwner(member,messageEmbed)){
//             return selectMenu.reply({
//                 content:selectMenuLang.interaction.cantUse,
//                 ephemeral:true,
//             })
//         }

//         let Newembed = messageEmbed
//             .setTitle(selectMenuLang.embed.title)
//             .setDescription(selectMenuLang.embed.description.format(selectMenu.values[0]))

//         const btnVentePro = new MessageActionRow()
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(selectMenuLang.button.cancel)
//                     .setStyle("DANGER")
//                     .setCustomId('VenteCarCancel')
//             )
//             .addComponents(
//                 new MessageButton()
//                     .setLabel(selectMenuLang.button.sell)
//                     .setStyle('SUCCESS')
//                     .setCustomId('VentePersoCarMenuVendre')
//             )
//             .addComponents(
//                 new MessageButton()
//                     .setLabel("Acheter la voiture")
//                     .setStyle('PRIMARY')
//                     .setCustomId('VentePersoCarMenuAchat')
//             )

//         selectMenu.update({
//             embeds:[Newembed],
//             components:[btnVentePro]
//         })
//     }
// }
