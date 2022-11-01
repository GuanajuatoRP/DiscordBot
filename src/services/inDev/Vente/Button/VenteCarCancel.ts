import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ButtonInteraction,
	GuildMember,
	Message,
	MessageFlags,
} from 'discord.js';
import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
import lang from '../../../../Tools/language.json';
const interactionLang = lang.button.VenteCarCancel;

export class VenteCarCancelBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['cancelSellCarBoutton']);
	}

	async execute(button: ButtonInteraction) {
		const message = button.message as Message;
		const messageEmbed = message.embeds[0];
		const member = button.member as GuildMember;

		// check if member can user button
		if (!IsEmbedOwner(member, messageEmbed)) {
			return button.reply({
				content: interactionLang.button.cantUse,
				ephemeral: true,
			});
		}

		if (message.flags.bitfield != MessageFlags.Ephemeral)
			await message.delete();

		return button.reply({
			content: interactionLang.i.content,
			ephemeral: true,
		});
	}
}
