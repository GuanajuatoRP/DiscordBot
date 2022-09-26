import { CarDTO } from '../../../../APIToUserApi/Models/CarDTO';
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonStyle,
	ColorResolvable,
	EmbedBuilder,
} from 'discord.js';
import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	AutocompleteInteraction,
	CommandInteraction,
	GuildMember,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import { NewImmatriculation } from '../../../../Tools/Exports/NewImmatriculation';
import CarController from '../../../../APIToUserApi/CarController';
const cmdLang = lang.commands.immatriculation;

export class ImmatriculationCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'immatriculation',
			category: 'RôlePlay', //* Default category is InDev
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
				{
					type: ApplicationCommandOptionType.String,
					name: 'immatriculation',
					min_length: 1,
					max_length: 8,
					description: cmdLang.slashOptions.immatriculation,
					autocomplete: false,
					required: false,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: false, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i);
		try {
			await i.deferReply();

			const member = i.member as GuildMember;
			let carList: CarDTO[] = [];
			await CarController.getUserAllCar(member.id)
				.then((cars: CarDTO[]) => {
					carList = cars.filter(car => car.imatriculation == '');
				})
				.catch(err => console.log(err));

			let immat =
				i.options.get('immatriculation') != null
					? i.options.get('immatriculation')!.value
					: '';

			let immatPrice: number = 3;
			if (immat != '') immatPrice = 5;

			const voiture = i.options.get('voiture')?.value;

			let selectedCar;
			if (
				carList
					.map((car: CarDTO) => `${car.maker} ${car.model} ${car.year}`)
					.includes(voiture as string)
			) {
				selectedCar = carList.find(
					car => `${car.maker} ${car.model} ${car.year}` == (voiture as string),
				) as CarDTO;
			} else {
				return i.editReply({
					content: cmdLang.i.wrongName.format(voiture as string),
				});
			}

			immat = await NewImmatriculation(immat as string);

			const embed = new EmbedBuilder()
				.setTitle(
					`${selectedCar.maker} ${selectedCar.model} ${selectedCar.year}` as string,
				)
				.setAuthor({
					name: cmdLang.embed.Author,
				})
				.setColor(cmdLang.embed.color as ColorResolvable)
				.setTimestamp()
				.setThumbnail(member.displayAvatarURL())
				.setFooter({ text: cmdLang.embed.footer.format(member.user.tag) })
				.addFields({ name: cmdLang.embed.fields.immat.name, value: immat });
			const btnsImmatriculation =
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel(cmdLang.button.cancel)
						.setStyle(ButtonStyle.Danger)
						.setCustomId('ImmatriculationCancel'),
				);

			if (!i.options.get('immatriculation')) {
				btnsImmatriculation.addComponents(
					new ButtonBuilder()
						.setLabel(cmdLang.button.reload)
						.setStyle(ButtonStyle.Primary)
						.setCustomId('ImmatriculationReload'),
				);
			}

			const btImmatriculatioBuy =
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel(cmdLang.button.buy)
						.setStyle(ButtonStyle.Success)
						.setCustomId('ImmatriculationBuy'),
				);

			if (immat == lang.commands.immatriculation.export.exist) {
				embed;
				return i.editReply({
					embeds: [embed],
					components: [btnsImmatriculation],
				});
			} else {
				embed.addFields({
					name: cmdLang.embed.fields.prix.name,
					value: (selectedCar.editPowerHp * immatPrice).toString(),
				});
				return i.editReply({
					embeds: [embed],
					components: [btnsImmatriculation, btImmatriculatioBuy],
				});
			}
		} catch (err) {
			console.log('Error : ', err);
			await this.client.emit('ErrorCommandLog', i, err);
			return i.reply(lang.bot.errorMessage);
		}
	}

	async onAutocomplete(i: AutocompleteInteraction) {
		const focusedOption = i.options.getFocused(true);
		const guildMember = i.member as GuildMember;
		let choices: Array<any>;

		if (focusedOption.name === 'voiture') {
			await CarController.getUserAllCar(guildMember.id)
				.then((cars: CarDTO[]) => {
					choices = cars
						.filter(car => car.imatriculation == '')
						.map(car => `${car.maker} ${car.model} ${car.year}`);
				})
				.catch(err => console.log(err));
		}

		const filtered = choices!
			.filter((choice: any) => choice.startsWith(focusedOption.value))
			.slice(0, 25);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
