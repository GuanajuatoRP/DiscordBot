import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	AutocompleteInteraction,
	ButtonBuilder,
	ButtonStyle,
	ColorResolvable,
	CommandInteraction,
	GuildMember,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import CarController from '../../../../APIToUserApi/CarController';
import { CarDTO } from '../../../../APIToUserApi/Models/CarDTO';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
const cmdLang = lang.commands.ventePerso;

export class VentePersoCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'vente-perso',
			// category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: 'voiture',
					description: cmdLang.slashOptions.voiture,
					autocomplete: true,
					required: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i);
		try {
			await i.deferReply({ ephemeral: true });

			const voitureOptions = i.options.get('voiture', true).value;
			const guildMember = i.member as GuildMember;
			const carEmbed = DefaultEmbed();
			let car: CarDTO;

			await CarController.getUserAllCar(guildMember.id)
				.then((cars: CarDTO[]) => {
					car = cars.filter(
						c => `${c.maker} ${c.model} ${c.year}` == voitureOptions,
					)[0] as CarDTO;

					carEmbed
						.setAuthor({
							name: `${car.maker} ${car.model} ${car.year}`,
						})
						.setColor(cmdLang.embed.color as ColorResolvable)
						.setFooter({
							text: `Utilisateur : ${(i.member! as GuildMember).user.tag}`,
							iconURL: (i.member! as GuildMember).displayAvatarURL(),
						})
						.setTimestamp()
						.setTitle(cmdLang.embed.title)
						.setDescription(cmdLang.embed.description)
						.setThumbnail(car.pictureLink)
						.addFields([
							{
								name: 'Class',
								value: `${car.editClass}${car.editPi}`,
								inline: true,
							},
							{
								name: 'Prix Total',
								value: `${car.totalPrice.toString()}`,
								inline: true,
							},
							{
								name: 'Puissance',
								value: `${car.editPowerHp.toString()}Cv`,
								inline: true,
							},
							{
								name: 'Poids',
								value: `${car.editWeightKg.toString()}Kg`,
								inline: true,
							},
							{
								name: 'Immatriculation',
								value: `${
									car.imatriculation == ''
										? 'Non renseigné'
										: car.imatriculation
								}`,
								inline: true,
							},
						]);
				})
				.catch(err => {
					return console.log(err);
				});

			const carBoutton = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setLabel(cmdLang.button.setPrice)
					.setStyle(ButtonStyle.Primary)
					.setCustomId('VentePersoSetPrice'),
			);

			return i.editReply({
				embeds: [carEmbed],
				components: [carBoutton],
			});
		} catch (error) {
			console.log(error);
			await this.client.emit('ErrorCommandLog', i, error);
			i.editReply(lang.bot.errorMessage);
		}
	}

	async onAutocomplete(i: AutocompleteInteraction) {
		const focusedOption = i.options.getFocused(true);
		const guildMember = i.member as GuildMember;
		let choices: Array<any>;

		if (focusedOption.name === 'voiture') {
			await CarController.getUserAllCar(guildMember.id)
				.then((cars: CarDTO[]) => {
					choices = cars.map(car => `${car.maker} ${car.model} ${car.year}`);
				})
				.catch(err => console.log(err));
		}

		const filtered = choices!
			.filter((choice: any) => choice.includes(focusedOption.value))
			.slice(0, 25);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
