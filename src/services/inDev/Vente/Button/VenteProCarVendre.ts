import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ButtonInteraction,
	ColorResolvable,
	Embed,
	EmbedBuilder,
	GuildMember,
	Message,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
import CarController from '../../../../APIToUserApi/CarController';
import { CarDTO } from '../../../../APIToUserApi/Models/CarDTO';
import { addMoneyRapport } from '../../../../Tools/Exports/embedMoney';
import { GetMoneyDTO } from '../../../../APIToUserApi/Models/GetMoneyDTO';
const interactionLang = lang.button.VenteProCar.Vendre;

export class VenteProCarVendreBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['sellCarBoutton']);
	}

	async execute(button: ButtonInteraction) {
		const message = button.message as Message;
		const messageEmbed = message.embeds[0] as Embed;
		const member = button.member as GuildMember;
		const carNameValue = messageEmbed.title as string;
		const carPriceValue = messageEmbed.fields[1].value;

		// check if member can user button
		if (!IsEmbedOwner(member, messageEmbed)) {
			return button.reply({
				content: interactionLang.button.cantUse,
				ephemeral: true,
			});
		}

		await CarController.getUserAllCar(member.id)
			.then(async (cars: CarDTO[]) => {
				const car = cars.filter(
					c => `${c.maker} ${c.model} ${c.year}` == carNameValue,
				)[0] as CarDTO;

				await CarController.SellCar(member.id, car).then(async res => {
					let Newembed = new EmbedBuilder()
						.setTitle(interactionLang.embed.title)
						.setColor(interactionLang.embed.color as ColorResolvable)
						.setThumbnail(member.displayAvatarURL())
						.addFields({
							name: interactionLang.embed.fields.Vente.name.format(
								member.displayName,
							),
							value:
								interactionLang.embed.fields.Vente.value.format(carPriceValue),
							inline: true,
						})
						.setFooter({
							text: `Voiture vendue :  ${carNameValue}`,
						});
					message.react('✅');

					let moneyDTO: GetMoneyDTO = new GetMoneyDTO();
					moneyDTO.money = res;

					await addMoneyRapport(
						member,
						moneyDTO,
						Number(carPriceValue),
						'Vente de voiture',
					);

					return await button.update({ embeds: [Newembed], components: [] });
				});
			})
			.catch(async err => {
				return await button.update({
					content: lang.bot.errorMessage,
					embeds: [],
					components: [],
				});
			});
	}
}
