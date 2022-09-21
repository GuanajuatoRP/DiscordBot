import { IsAdmin } from '../../../../Tools/Exports/isAdmin';
import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { ButtonInteraction, GuildMember, Message } from 'discord.js';
import lang from '../../../../Tools/language.json';
const interactionLang = lang.button.CancelBuyCarBoutton;

export class CancelBuyCarBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['cancelBuyCarBoutton']);
	}

	execute(button: ButtonInteraction) {
		try {
			const message = button.message as Message;
			const messageEmbed = message.embeds[0];
			const member = button.member as GuildMember;

			// check if member can user button
			if (!IsEmbedOwner(member, messageEmbed) && !IsAdmin(member)) {
				return button.reply({
					content: interactionLang.interractions,
					ephemeral: true,
				});
			}

			message.delete();

			return button.reply({
				content: "La demmande d'achat de voiture a bien été annuler",
				ephemeral: true,
			});
		} catch (err) {
			console.log('Error : ', err);
			return button.reply(lang.bot.errorMessage);
		}
	}
}
