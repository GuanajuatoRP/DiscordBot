import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	AutocompleteInteraction,
	CommandInteraction,
	EmbedBuilder,
	GuildMember,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import CarController from '../../../../APIToUserApi/CarController';
import { CarDTO } from '../../../../APIToUserApi/Models/CarDTO';
const cmdLang = lang.commands.ventePro;

export class VenteProCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'vente-pro',
			// category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: 'voiture',
					description: 'Voiture a que vous souhaitez vendre',
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
		await i.deferReply();

		const voitureOptions = i.options.get('voiture', true).value;
		const guildMember = i.member as GuildMember;
		let car: CarDTO;
		const carEmbed = new EmbedBuilder();

		await CarController.getUserAllCar(guildMember.id)
			.then((cars: CarDTO[]) => {
				car = cars.filter(
					c => `${c.maker} ${c.model} ${c.year}` == voitureOptions,
				)[0] as CarDTO;

				carEmbed
					.setAuthor({
						name: lang.embeds.default.author,
						iconURL:
							'https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg',
						url: 'https://discord.gg/BtkWVH2Kq9',
					})
					.setColor('#1732A6')
					.setFooter({
						text: `Utilisateur : ${(i.member! as GuildMember).user.tag}`,
						iconURL: (i.member! as GuildMember).displayAvatarURL(),
					})
					.setTimestamp()
					.setTitle(`${car!.maker} ${car.model} ${car.year}`)
					.setThumbnail(car.pictureLink)
					.addFields([
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
							inline: true,
						},
						{
							name: 'Prix total',
							value: car.totalPrice.toString(),
							inline: false,
						},
						{
							name: 'Prix de vente',
							value: (car.totalPrice * 0.75).toString(),
							inline: false,
						},
						{
							name: 'Vitesse',
							value: car.editSpeed.toString(),
							inline: true,
						},
						{
							name: 'Tenue de route',
							value: car.editHandling.toString(),
							inline: true,
						},
						{
							name: 'Accélération',
							value: car.editAccelerate.toString(),
							inline: true,
						},
						{
							name: 'Départ arréter',
							value: car.editLaunch.toString(),
							inline: true,
						},
						{
							name: 'Freinage',
							value: car.editBraking.toString(),
							inline: true,
						},
						{
							name: 'Offroad',
							value: car.editOffroad.toString(),
							inline: true,
						},
						{
							name: 'Immatriculable',
							value: car.editOnRoad ? 'Oui' : 'Non',
							inline: false,
						},
					]);
			})
			.catch(err => console.log(err));

		return i.editReply({
			content: cmdLang.i.content,
			embeds: [carEmbed],
		});
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
			.filter((choice: any) => choice.startsWith(focusedOption.value))
			.slice(0, 25);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
