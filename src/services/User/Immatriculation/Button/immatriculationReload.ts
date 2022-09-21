import { IsAdmin } from '../../../../Tools/Exports/isAdmin';
import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
import { NewImmatriculation } from '../../../../Tools/Exports/NewImmatriculation';
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { ButtonInteraction, GuildMember, Message } from 'discord.js';
import lang from '../../../../Tools/language.json';
const interactionLang = lang.button.ImmatriculationReload;

export class ImmatriculationReloadBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['ImmatriculationReload']);
	}

	async execute(button: ButtonInteraction) {
		try {
			const message = button.message as Message;
			const member = button.member as GuildMember;
			const embedMessage = message.embeds[0];

			if (!IsEmbedOwner(member, embedMessage) || !IsAdmin(member)) {
				return button.reply({
					content: interactionLang.button.cantUse,
					ephemeral: true,
				});
			}

			let embed = embedMessage;
			embed.fields[0].value = await NewImmatriculation('' as string);

			return button.update({ embeds: [embed] });
		} catch (err) {
			console.log('Error : ', err);
			return button.reply(lang.bot.errorMessage);
		}
	}
}
