// import { GuildMember } from 'discord.js';
// import { Command } from 'sheweny';
// import type { ShewenyClient } from 'sheweny';
// import {
// 	ActionRowBuilder,
// 	ApplicationCommandOptionType,
// 	AutocompleteInteraction,
// 	ButtonBuilder,
// 	ButtonStyle,
// 	CommandInteraction,
// 	EmbedBuilder,
// } from 'discord.js';
// import lang from '../../../../Tools/language.json';
// import CarController from '../../../../APIToUserApi/CarController';
// import { OrigialCarDTO } from '../../../../APIToUserApi/Models/OrigialCarDTO';
// const cmdLang = lang.commands.concessionnaire;

// export class ConcessionnaireCommand extends Command {
// 	constructor(client: ShewenyClient) {
// 		super(client, {
// 			name: 'concessionnaire',
// 			category: '', //* Default category is InDev
// 			// type: '', //* Default type is SLASH_COMMAND
// 			description: cmdLang.description.desc,
// 			usage: cmdLang.description.usage,
// 			examples: cmdLang.description.exemples,
// 			options: [
// 				{
// 					type: ApplicationCommandOptionType.String,
// 					name: 'voiture',
// 					description: cmdLang.slashOptions.optionName,
// 					required: true,
// 					autocomplete: true,
// 				},
// 			],
// 			// channel : '', //* Default Channel is GUILD
// 			// cooldown : , //* Default cooldown set at 2sec
// 			adminsOnly: true, //* Default value is false
// 			//userPermissions : [],
// 			//clientPermissions : []
// 		});
// 	}
// 	async execute(i: CommandInteraction) {
// 		this.client.emit('CommandLog', i);
// 		try {
// 			await i.deferReply({ ephemeral: true });

// 			const makerCar = i.options.get('voiture', true).value;

// 			let concessionnaire: OrigialCarDTO[];
// 			await CarController.getAllOriginalCar()
// 				.then(res => {
// 					concessionnaire = res;
// 				})
// 				.catch(err => console.log(err));

// 			const car = concessionnaire!.filter(
// 				c =>
// 					c.maker === makerCar &&
// 					c.model === modelCar &&
// 					c.year == (yearCar as number),
// 			)[0];

// 			const carEmbed = new EmbedBuilder()
// 				.setAuthor({
// 					name: lang.embeds.default.author,
// 					iconURL:
// 						'https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg',
// 					url: 'https://discord.gg/BtkWVH2Kq9',
// 				})
// 				.setColor('#ff8000')
// 				.setFooter({
// 					text: `Utilisateur : ${(i.member! as GuildMember).user.tag}`,
// 					iconURL: (i.member! as GuildMember).displayAvatarURL(),
// 				})
// 				.setTimestamp()
// 				.setTitle(`${car.maker} ${car.model} ${car.year}`)
// 				.setThumbnail(car.pictureLink)
// 				.addFields([
// 					{
// 						name: 'Marque',
// 						value: car.maker,
// 						inline: true,
// 					},
// 					{
// 						name: 'Model',
// 						value: car.model,
// 						inline: true,
// 					},
// 					{
// 						name: 'Année',
// 						value: car.year.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Class',
// 						value: `${car.class}${car.pi}`,
// 						inline: true,
// 					},
// 					{
// 						name: 'Prix',
// 						value: car.price.toString(),
// 						inline: false,
// 					},
// 					{
// 						name: 'Vitesse',
// 						value: car.speed.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Tenue de route',
// 						value: car.handling.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Accélération',
// 						value: car.accelerate.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Départ arréter',
// 						value: car.launch.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Freinage',
// 						value: car.braking.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Offroad',
// 						value: car.offroad.toString(),
// 						inline: true,
// 					},
// 					{
// 						name: 'Immatriculable',
// 						value: car.onRoad ? 'Oui' : 'Non',
// 						inline: false,
// 					},
// 				]);

// 			const buyBoutton = new ActionRowBuilder<ButtonBuilder>().addComponents(
// 				new ButtonBuilder()
// 					.setStyle(ButtonStyle.Primary)
// 					.setLabel('Acheter')
// 					.setCustomId('buyCar'),
// 			);
// 			i.editReply({
// 				embeds: [carEmbed],
// 				components: [buyBoutton],
// 			});
// 		} catch (error) {
// 			i.reply(lang.bot.errorMessage);
// 			this.client.emit('ErrorCommandLog', i, error);
// 		}
// 	}
// 	async onAutocomplete(i: AutocompleteInteraction) {
// 		const focusedOption = i.options.getFocused(true);
// 		const voitureOptions = i.options.get('Voiture');

// 		let choices: Array<string>;

// 		if (focusedOption.name === 'marque') {
// 			choices = [
// 				...new Set(
// 					await CarController.searchCar()
// 			.then(res => {
// 				concessionnaire = res.map((c: OrigialCarDTO) => `${c.maker} ${c.model} ${c.year} (${c.class} ${c.pi})`);
// 			})
// 			.catch(err => console.log(err));
// 				),
// 			].sort();
// 		}

// 		const filtered = choices!
// 			.filter((choice: any) => choice.startsWith(focusedOption.value))
// 			.slice(0, 25);
// 		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
// 	}
// }
