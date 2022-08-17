import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from 'sheweny';
import { DefaultEmbed } from '../../../tools/export';
import { stripIndents } from 'common-tags';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js';
import lang from '../../../tools/language.json';
const cmdLang = lang.commands.adminhelp;

export class AdminHelpCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'adminhelp',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: 'commande',
					description: cmdLang.slashOptions.description,
					autocomplete: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			// clientPermissions : []
		});
	}
	execute(interaction: CommandInteraction) {
		this.client.emit('AdminCommandLog', interaction as CommandInteraction);
		let commandName = interaction.options;
		const commands = this.client.collections.commands.map(c => c[0]); //Get All Commands loaded for the bot

		if (!commandName.get('commande')) {
			//si aucune commande est donner en paramètre
			let allCategory = new Array(); //Get All Unnique Catégory
			this.client.collections.commands
				.map(c => c[0])
				.forEach(command => {
					if (command.category == 'InDev' || command.category == 'Admin') {
						if (!allCategory.includes(command.category)) {
							allCategory.push(command.category);
						}
					}
				});

			let Embed = DefaultEmbed()
				.setColor('#FF0000')
				.setDescription(lang.commands.help.description.desc);

			for (const category of allCategory) {
				const commandOfCategory: Array<string> = commands
					.filter(
						c =>
							c.category === `${category}` &&
							c.adminsOnly === true &&
							c.type === 'SLASH_COMMAND',
					)
					.map(c => `\`${c.name}\``);

				if (commandOfCategory.length == 0)
					commandOfCategory.push('No Command in this Category');

				Embed.addFields({
					name: `${category}`,
					value: `${commands
						.filter(
							c =>
								c.category === `${category}` &&
								c.adminsOnly === true &&
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
						c.category == 'InDev' ||
						(c.category == 'Admin' &&
							c.type === 'SLASH_COMMAND' &&
							c.name != 'adminlist'),
				)
				.map(c => c.name);
			let randomCommand1: string;
			let randomCommand2: string;
			do {
				randomCommand1 =
					availableCommand[Math.floor(Math.random() * availableCommand.length)];
				randomCommand2 =
					availableCommand[Math.floor(Math.random() * availableCommand.length)];
			} while (randomCommand1 == randomCommand2);
			Embed.addFields({
				name: cmdLang.embed.fields.info.name,
				value: cmdLang.embed.fields.info.value.format(
					randomCommand1,
					randomCommand2,
				),
			});

			return interaction.reply({
				embeds: [Embed],
				ephemeral: true,
			});
		} else if (commandName.get('commande')) {
			//si une commande est donner en paramètre
			const CName = `${commandName.get('commande')!.value}`; //récupération du nom
			const command = this.client.collections.commands
				.map(c => c[0])
				.filter(c => c.name == CName)[0] as Command; //récupération du nom

			if (!commands.map(c => c.name).includes(CName)) {
				return interaction.reply({
					content: cmdLang.interaction.wrongName.format(CName),
					ephemeral: true,
				});
			}
			if (command!.adminsOnly === false) {
				return interaction.reply({
					content: cmdLang.interaction.noRead.format(CName),
					ephemeral: true,
				});
			}

			return interaction.reply({
				content: stripIndents`
                \`\`\`makefile
                    [AdminHelp : ${
											command!.name
										}]                ⚠️⚠️!!! AdminOnly !!!⚠️⚠️
                    [Catégorie : ${command!.category}]
                    ${command!.description}

                    Utilisation: /${command!.usage}
                    Exemple${
											Array.from(command!.examples!).length == 1 ? '' : 's'
										}: /${Array.from(command!.examples!).join(`, /`)}


                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
				ephemeral: true,
			});
		}
	}

	onAutocomplete(interaction: AutocompleteInteraction) {
		const focusedOption = interaction.options.getFocused(true);

		const choices: Array<string> = (
			this.client.collections.commands.map(c => c[0]) as Command[]
		)
			.filter(
				c =>
					(c as Command).category == `InDev` ||
					((c as Command).category == `Admin` &&
						(c as Command).adminsOnly === true &&
						(c as Command).type === 'SLASH_COMMAND'),
			)
			.map(c => (c as Command).name);

		if (focusedOption.name === 'commande') {
			choices;
		}

		const filtered = choices!.filter((choice: any) =>
			choice.startsWith(focusedOption.value),
		);
		interaction.respond(
			filtered.map((choice: any) => ({ name: choice, value: choice })),
		);
	}
}
