import { SelectMenu } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ColorResolvable,
	EmbedBuilder,
	GuildMember,
	SelectMenuInteraction,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
const selectMenuLang = lang.SelectMenu.VenteProCarMenu;

export class venteProCarMenuSM extends SelectMenu {
	constructor(client: ShewenyClient) {
		super(client, ['VenteProCarMenu']);
	}

	execute(selectMenu: SelectMenuInteraction) {
		const member = selectMenu.member as GuildMember;

		let embed = new EmbedBuilder()
			.setAuthor({ name: selectMenuLang.embed.Author })
			.setTitle(selectMenuLang.embed.title)
			.setDescription(selectMenuLang.embed.description)
			.setColor(selectMenuLang.embed.color as ColorResolvable)
			.setFooter({ text: selectMenuLang.embed.footer.format(member.user.tag) })
			.setTimestamp()
			.setThumbnail(member.displayAvatarURL())
			// TODO : Call API Get this Car Info
			.addFields({
				name: selectMenuLang.embed.fields.stats.name,
				value: 'xxx',
				inline: true,
			});

		const btnVentePro = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel(selectMenuLang.button.cancel)
					.setStyle(ButtonStyle.Danger)
					.setCustomId('VenteCarCancel'),
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel(selectMenuLang.button.sell)
					.setStyle(ButtonStyle.Success)
					.setCustomId('VenteProCarMenuVendre'),
			);

		selectMenu.update({
			content: selectMenuLang.i.content,
			components: [],
		});

		selectMenu.channel!.send({
			embeds: [embed],
			components: [btnVentePro],
		});
	}
}
