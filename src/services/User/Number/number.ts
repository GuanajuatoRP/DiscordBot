import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import lang from '../../../Tools/language.json';
import { DefaultEmbed } from '../../../Tools/Exports/export';
const cmdLang = lang.commands.number;

export class NumberCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'number',
			category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Number,
					name: 'nbval',
					description: cmdLang.slashOptions.nbval.description,
					autocomplete: false,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Number,
					name: 'plage',
					description: cmdLang.slashOptions.plage.description,
					autocomplete: false,
					required: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			// adminsOnly : , //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			// clientPermissions : []
		});
	}
	execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);
		try {
			const nbval: number = i.options.get('nbval', true).value as number;
			const plage: number = i.options.get('plage', true).value as number;

			if (nbval > plage) {
				return i.reply({
					content: cmdLang.messageError,
					ephemeral: true,
				});
			}
			let result: Array<Number> = new Array<Number>();
			let nb: number;
			for (let i = 0; i < nbval; i++) {
				do {
					//Get random number between 1 and max (plage)
					nb = Math.floor(Math.random() * (plage - 1 + 1) + 1);
				} while (result.includes(nb));
				result.push(nb);
			}
			result.sort((a: any, b: any) => {
				return a - b;
			});
			let embed = DefaultEmbed();
			embed.addFields({
				name: `${nbval === 1 ? 'La valeur' : 'Liste des valeurs'}`,
				value: result.join(','),
				inline: true,
			});
			return i.reply({
				embeds: [embed],
			});
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
