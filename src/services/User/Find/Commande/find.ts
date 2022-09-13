import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	AutocompleteInteraction,
	CommandInteraction,
	GuildMember,
} from 'discord.js';
import UserController from '../../../../APIToUserApi/UserController';
import lang from '../../../../Tools/language.json';
import { UserDTO } from '../../../../APIToUserApi/Models/UserDTO';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
import CarController from '../../../../APIToUserApi/CarController';
import { CarDTO } from '../../../../APIToUserApi/Models/CarDTO';
import { IsAdmin } from '../../../../Tools/Exports/isAdmin';
import { Roles } from '../../../../Util/appConfig.json';
const cmdLang = lang.commands.find;

export class FindCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'find',
			category: 'RôlePlay Police', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: 'member',
					description: cmdLang.slashOptions.subCommandMember,
					options: [
						{
							type: ApplicationCommandOptionType.User,
							name: 'member',
							description: cmdLang.slashOptions.member,
							required: true,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: 'car',
					description: cmdLang.slashOptions.subCommandCar,
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: 'car',
							description: cmdLang.slashOptions.car,
							required: true,
							autocomplete: true,
						},
					],
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			// adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i);
		try {
			const iMember = i.member as GuildMember;

			if (!IsAdmin(iMember) && !iMember.roles.cache.has(Roles.GMB)) {
				await this.client.emit('userMissingPermissions');
				return i.reply({
					ephemeral: true,
					content: lang.event.userMissingPermission.i.content,
				});
			}

			await i.deferReply();

			const subCommand = i.options!.data[0];

			switch (subCommand.name) {
				case 'member':
					const guildMember = subCommand.options![0].member as GuildMember;
					await UserController.getUser(guildMember.id)
						.then((user: UserDTO) => {
							const embed = DefaultEmbed()
								.setTitle('Identity Card')
								.setColor('Green')
								.setThumbnail(guildMember.displayAvatarURL() as string)
								.addFields([
									{
										name: 'Prénom',
										value: user.prenom,
										inline: true,
									},
									{
										name: 'Nom',
										value: user.nom,
										inline: true,
									},
									{
										name: 'Username',
										value: user.username,
										inline: true,
									},
									{
										name: 'Sexe',
										value: user.sexe,
										inline: true,
									},
									{
										name: "Date d'arriver a Guanajuato",
										value: user.createdAt,
										inline: false,
									},
									{
										name: 'Permis',
										value: user.permis,
										inline: true,
									},
									{
										name: 'Points',
										value: user.points.toString(),
										inline: true,
									},
									{
										name: 'Stage',
										value: user.stage.name,
										inline: true,
									},
									{
										name: 'Argent',
										value: user.argent.toString(),
										inline: false,
									},
									{
										name: 'Total Session',
										value: user.nbSessions.toString(),
										inline: true,
									},
									{
										name: 'Sessions Police',
										value: user.nbSessionsPolice.toString(),
										inline: true,
									},
									{
										name: 'Sessions Restante',
										value: user.nbSessionsPermis.toString(),
										inline: true,
									},
									{
										name: 'Nombre de voitures',
										value: user.voitures.length.toString(),
										inline: true,
									},
								]);
							return i.editReply({
								content: 'find',
								embeds: [embed],
							});
						})
						.catch(err => {
							if (
								err.response.data ==
								'Aucun utilisateur trouver avec ce discordId'
							)
								return i.editReply({
									content: cmdLang.error.member,
								});
							else {
								this.client.emit('ErrorCommandLog', i, err);
								return i.editReply({
									content: lang.bot.errorMessage,
								});
							}
						});
					break;
				case 'car':
					const immatriculation = subCommand.options![0].value as string;
					let car: CarDTO | undefined;
					await CarController.getAllCar()
						.then((cars: CarDTO[]) => {
							car = cars.find(
								(c: CarDTO) => c.imatriculation === immatriculation,
							);
						})
						.catch(err => {
							this.client.emit('ErrorCommandLog', i, err);
							console.log(err);
							return i.editReply({
								content: lang.bot.errorMessage,
							});
						});

					if (!car)
						return i.editReply({
							content: cmdLang.error.car,
						});
					else {
						const embed = DefaultEmbed()
							.setTitle('Carte grise')
							.setColor('Blue')
							.addFields([
								{
									name: 'Propriétaire',
									value: car.username,
									inline: false,
								},
								{
									name: 'Marque',
									value: car.maker,
									inline: true,
								},
								{
									name: 'Model',
									value: car.model,
									inline: true,
								},
								{
									name: 'Année',
									value: car.year.toString(),
									inline: true,
								},
								{
									name: 'Class',
									value: `${car.editClass}${car.editPi}`,
									inline: false,
								},
								{
									name: 'Immatriculation',
									value: car.imatriculation,
									inline: false,
								},
							]);
						return i.editReply({ embeds: [embed] });
					}
			}
		} catch (err) {
			this.client.emit('ErrorCommandLog', i, err);
			console.log(err);
			return i.editReply({
				content: lang.bot.errorMessage,
			});
		}
	}
	async onAutocomplete(i: AutocompleteInteraction) {
		const focusedOption = i.options.getFocused(true);
		let choices: Array<string>;

		if (focusedOption.name === 'car') {
			await CarController.getAllCar()
				.then((cars: CarDTO[]) => {
					choices = cars
						.filter(car => car.imatriculation && car.imatriculation !== '')
						.map(car => car.imatriculation);
				})
				.catch(err => console.log(err));
		}

		const filtered = choices!.filter((choice: any) =>
			choice.startsWith(focusedOption.value),
		);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
