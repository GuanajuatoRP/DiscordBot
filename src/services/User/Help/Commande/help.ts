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
			let commandOptions = i.options;

			const allCategory = [
				...new Set(
					this.client.collections.commands
						.map(c => c[0].category)
						.filter(c => c != 'InDev' && c != 'Admin'),
				),
			]; //Get All Unnique Catégory

			const commands: Command[] = [
				...new Set(
					this.client.collections.commands
						.map(c => c[0])
						.filter(
							c =>
								c.category != 'InDev' &&
								c.adminsOnly == false &&
								c.type == 'SLASH_COMMAND',
						),
				),
			] as Command[]; //Get All Commands loaded for the bot

			if (!commandOptions.get('commande')) {
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
				let availableCommand: Array<string> = commands.map(c => c.name);

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
			} else {
				const CName = `${commandOptions.get('commande')!.value}`;
				const command = commands.find(c => c.name === CName);

				if (!command) {
					return i.reply({
						content: cmdLang.i.wrongName.format(CName),
						ephemeral: false,
					});
				}
				if (command.adminsOnly === true) {
					return i.reply({
						content: cmdLang.i.noRead.format(CName),
						ephemeral: false,
					});
				}

				return i.reply({
					content: stripIndents`
                \`\`\`makefile
                    [help : ${
											command.name
										}]                       [Category : ${command.category}]

                    ${command.description}

                    Utilisation: /${command.usage}
                    Exemple${
											Array.from(command.examples!).length == 1 ? '' : 's'
										}: /${Array.from(command.examples!).join(`, /`)}


                    {} = argument(s) obligatoire
                    <> = argument(s) optionnel(s)
                    A|B = Indique que c'est soit A soit B
                    Les caractères suivants -> {}, <>, | ne doivents pas être inclus dans les commandes
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
			choice.includes(focusedOption.value),
		);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
