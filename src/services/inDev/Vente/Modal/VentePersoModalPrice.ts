import { Modal } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Embed,
	GuildMember,
	Message,
	MessageFlags,
	ModalSubmitInteraction,
} from 'discord.js';

export class VentePersoModalPrice extends Modal {
	constructor(client: ShewenyClient) {
		super(client, ['VentePersoCarModelPrice']);
	}

	async execute(modal: ModalSubmitInteraction) {
		const member = modal.member as GuildMember;
		const message = modal.message as Message;
		const messageEmbed = message.embeds[0] as Embed;
		const buttons = message.components;
		const carPrice = parseInt(
			messageEmbed.fields.find(f => f.name == 'Prix Total')?.value as string,
		);
		const priceField = modal.fields.getTextInputValue(
			'VentePersoCarModelPriceInput',
		);

		// check if member can user button
		if (!messageEmbed.footer!.text.split(' : ')[1].includes(member.user.tag)) {
			if (message.flags.bitfield != MessageFlags.Ephemeral)
				await message.delete();
			else modal.webhook.deleteMessage(message);

			return modal.reply({
				content:
					"Vous n'avez pas la permission de définir le prix de cette voiture",
				ephemeral: true,
			});
		} else if (!/^\d+$/.test(priceField)) {
			if (
				(buttons[0].components[0].data as any).custom_id ==
				'cancelSellCarBoutton'
			)
				buttons[0].components.splice(0, 1);

			if (message.flags.bitfield != MessageFlags.Ephemeral)
				await message.delete();
			else modal.webhook.deleteMessage(message);
			return modal.reply({
				content: `\`\`\`diff
-> Le prix de vente doit être un nombre\`\`\``,

				embeds: [messageEmbed],
				components: buttons,
				ephemeral: true,
			});
		} else if (
			parseInt(priceField) < carPrice * 0.5 ||
			parseInt(priceField) > carPrice * 1.5
		) {
			if (message.flags.bitfield != MessageFlags.Ephemeral)
				await message.delete();
			else modal.webhook.deleteMessage(message);
			if (
				(buttons[0].components[0].data as any).custom_id ==
				'cancelSellCarBoutton'
			)
				buttons[0].components.splice(0, 1);
			return modal.reply({
				content: `\`\`\`diff
-> Le prix de vente doit être entre ${parseInt(
					(carPrice * 0.5).toString(),
				)} et ${parseInt((carPrice * 1.5).toString())}\`\`\``,
				embeds: [messageEmbed],
				components: buttons,
				ephemeral: true,
			});
		}

		let sellPrice = messageEmbed.fields.find(f => f.name == 'Prix de vente');

		if (sellPrice) {
			sellPrice.value = priceField;
		} else {
			messageEmbed.fields.push({
				name: 'Prix de vente',
				value: priceField,
			});
		}

		const carBoutton = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Annuler')
					.setStyle(ButtonStyle.Danger)
					.setCustomId('cancelSellCarBoutton'),
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel('Définir un prix de vente')
					.setStyle(ButtonStyle.Primary)
					.setCustomId('VentePersoSetPrice'),
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel('Acheter')
					.setStyle(ButtonStyle.Success)
					.setCustomId('VentePersoAcheter'),
			);

		if (message.flags.bitfield != MessageFlags.Ephemeral)
			await message.delete();
		else modal.webhook.deleteMessage(message);

		return modal.reply({
			embeds: [messageEmbed],
			components: [carBoutton],
		});
	}
}
