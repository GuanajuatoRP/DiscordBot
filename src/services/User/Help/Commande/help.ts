import { Command } from 'sheweny';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
import { stripIndents } from 'common-tags';
import type { ShewenyClient } from 'sheweny';
import {
	CommandInteraction,
	AutocompleteInteraction,
	ApplicationCommandOptionType,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
const cmdLang = lang.commands.help;

export class HelpCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'help',
			category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: 'commande',
					description: cmdLang.slashOptions.command.description,
					autocomplete: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			// adminsOnly : , //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			clientPermissions: [],
		});
	}
	execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i as CommandInteraction);

		try {
			let commandName = i.options;

			let allCategory = new Array(); //Get All Unnique Catégory

			this.client.collections.commands
				.map(c => c[0])
				.forEach(command => {
					// Filter all catégory without InDev and Admin
					if (
						!allCategory.includes(`${command.category}`) &&
						command.category != 'InDev' &&
						command.category != 'Admin'
					)
						allCategory.push(`${command.category}`);
				});
			const commands: Command[] = this.client.collections.commands.map(
				c => c[0],
			) as Command[]; //Get All Commands loaded for the bot

			if (!commandName.get('commande')) {
				let Embed = DefaultEmbed().setDescription(
					lang.commands.help.description.desc,
				);
				for (const category of allCategory) {
					Embed.addFields({
						name: `${category}`,
						value: `${commands
							.filter(
								c =>
									c.category === `${category}` &&
									c.adminsOnly === false &&
									c.type === 'SLASH_COMMAND',
							)
							.map(c => `\`${c.name}\``)
							.join(', ')}`,
					});
				}

				// Define random command for /help example
				let availableCommand: Array<string> = commands
					.filter(
						c =>
							c.category != 'InDev' &&
							c.category != 'Admin' &&
							c.adminsOnly === false &&
							c.type === 'SLASH_COMMAND',
					)
					.map(c => c.name);
				let randomCommand1: string;
				let randomCommand2: string;
				do {
					randomCommand1 =
						availableCommand[
							Math.floor(Math.random() * availableCommand.length)
						];
					randomCommand2 =
						availableCommand[
							Math.floor(Math.random() * availableCommand.length)
						];
				} while (randomCommand1 == randomCommand2);
				Embed.addFields({
					name: cmdLang.genericEmbed.fields.info.name,
					value: cmdLang.genericEmbed.fields.info.value.format(
						randomCommand1,
						randomCommand2,
					),
				});

				return i.reply({
					embeds: [Embed],
					ephemeral: false,
				});
			} else if (commandName.get('commande')) {
				const CName = `${commandName.get('commande')!.value}`;
				const command = this.client.collections.commands.get(CName);

				if (!commands.map(c => c.name).includes(CName)) {
					return i.reply({
						content: cmdLang.i.wrongName.format(CName),
						ephemeral: false,
					});
				}
				if (command![0].adminsOnly === true) {
					return i.reply({
						content: cmdLang.i.noRead.format(CName),
						ephemeral: false,
					});
				}

				return i.reply({
					content: stripIndents`
                \`\`\`makefile
                    [help : ${
											command![0].name
										}]                       [Category : ${
						command![0].category
					}]

                    ${command![0].description}

                    Utilisation: /${command![0].usage}
                    Exemple${
											Array.from(command![0].examples!).length == 1 ? '' : 's'
										}: /${Array.from(command![0].examples!).join(`, /`)}


                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
					ephemeral: false,
				});
			}
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
	onAutocomplete(i: AutocompleteInteraction) {
		const focusedOption = i.options.getFocused(true);

		const choices: Array<string> = (
			this.client.collections.commands.map(c => c[0]) as Command[]
		)
			.filter(
				c =>
					(c as Command).category != `InDev` &&
					(c as Command).adminsOnly == false &&
					(c as Command).type == 'SLASH_COMMAND',
			)
			.map(c => (c as Command).name);

		if (focusedOption.name === 'commande') {
			choices;
		}

		const filtered = choices!.filter((choice: any) =>
			choice.startsWith(focusedOption.value),
		);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
