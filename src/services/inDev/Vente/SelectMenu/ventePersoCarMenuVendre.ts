// import { SelectMenu } from 'sheweny';
// import type { ShewenyClient } from 'sheweny';
// import {
// 	ActionRowBuilder,
// 	ButtonBuilder,
// 	ButtonStyle,
// 	Embed,
// 	GuildMember,
// 	SelectMenuInteraction,
// } from 'discord.js';
// import lang from '../../../../Tools/language.json';
// import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
// import { DefaultEmbed } from '../../../../Tools/Exports/export';
// const selectMenuLang = lang.SelectMenu.AchatPersoCarMenu;

// export class ventePersoCarMenuVendreSM extends SelectMenu {
// 	constructor(client: ShewenyClient) {
// 		super(client, ['VentePersoCarMenuVendreUser']);
// 	}

// 	execute(selectMenu: SelectMenuInteraction) {
// 		try {
// 			const member = selectMenu.member as GuildMember;
// 			const messageEmbed = selectMenu.message.embeds[0] as Embed;

// 			// check if member can user button
// 			if (!IsEmbedOwner(member, messageEmbed)) {
// 				return selectMenu.reply({
// 					content: selectMenuLang.i.cantUse,
// 					ephemeral: true,
// 				});
// 			}
// 			let Newembed = DefaultEmbed()
// 				.setTitle(selectMenuLang.embed.title)
// 				.setDescription(
// 					selectMenuLang.embed.description.format(selectMenu.values[0]),
// 				);

// 			const btnVentePro = new ActionRowBuilder<ButtonBuilder>()
// 				.addComponents(
// 					new ButtonBuilder()
// 						.setLabel(selectMenuLang.button.cancel)
// 						.setStyle(ButtonStyle.Danger)
// 						.setCustomId('VenteCarCancel'),
// 				)
// 				.addComponents(
// 					new ButtonBuilder()
// 						.setLabel(selectMenuLang.button.sell)
// 						.setStyle(ButtonStyle.Success)
// 						.setCustomId('VentePersoCarMenuVendre'),
// 				)
// 				.addComponents(
// 					new ButtonBuilder()
// 						.setLabel('Acheter la voiture')
// 						.setStyle(ButtonStyle.Success)
// 						.setCustomId('VentePersoCarMenuAchat'),
// 				);

// 			selectMenu.update({
// 				embeds: [Newembed],
// 				components: [btnVentePro],
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
// }
