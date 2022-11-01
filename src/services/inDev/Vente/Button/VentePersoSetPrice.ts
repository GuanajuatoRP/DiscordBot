import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	APIEmbedField,
	ButtonInteraction,
	Embed,
	GuildMember,
	Message,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
// import appConfig from '../../Util/appConfig.json'

export class VentePersoSetPriceBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['VentePersoSetPrice']);
	}

	async execute(button: ButtonInteraction) {
		const member = button.member as GuildMember;
		const message = button.message as Message;
		const messageEmbed = message.embeds[0] as Embed;
		const priceField = messageEmbed.fields.find(
			f => f.name == 'Prix Total',
		) as APIEmbedField;

		// check if member can user button
		if (!messageEmbed.footer!.text.split(' : ')[1].includes(member.user.tag)) {
			return button.reply({
				content:
					"Vous n'avez pas la permission de définir le prix de cette voiture",
				ephemeral: true,
			});
		}

		const modalPrice = new ModalBuilder()
			.setTitle(`Vente de : ${messageEmbed.author?.name}`)
			.setCustomId('VentePersoCarModelPrice')
			.setComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setCustomId('VentePersoCarModelPriceInput')
						.setPlaceholder(
							`Le prix de ventre doit être entre ${parseInt(
								(Number(priceField.value) * 0.5).toString(),
							)} et ${parseInt((Number(priceField.value) * 1.5).toString())}`,
						)
						.setLabel(`Prix de vente`)
						.setMinLength(5)
						.setMaxLength(7)
						.setStyle(TextInputStyle.Short),
				),
			);

		return button.showModal(modalPrice);
	}
}
