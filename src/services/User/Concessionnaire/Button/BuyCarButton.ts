import { removeMoneyRapport } from '../../../../Tools/Exports/embedMoney';
import { GetMoneyDTO } from '../../../../APIToUserApi/Models/GetMoneyDTO';
import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ButtonInteraction,
	GuildMember,
	Message,
	Embed,
	EmbedBuilder,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import CarController from '../../../../APIToUserApi/CarController';
import { OrigialCarDTO } from '../../../../APIToUserApi/Models/OrigialCarDTO';
import MoneyController from '../../../../APIToUserApi/MoneyController';
const interactionLang = lang.button.ImmatriculationBuy;

export class CarBuyBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['buyCarBoutton']);
	}

	async execute(button: ButtonInteraction) {
		try {
			const message = button.message as Message;
			const member = button.member as GuildMember;
			const embedMessage = message.embeds[0] as Embed;

			if (!IsEmbedOwner(member, embedMessage)) {
				return button.reply({
					content: interactionLang.button.cantUse,
					ephemeral: true,
				});
			}

			const makerCar = embedMessage.fields[0].value;
			const modelCar = embedMessage.fields[1].value;
			const yearCar = Number(embedMessage.fields[2].value);

			let concessionnaire: OrigialCarDTO[];
			await CarController.getAllOriginalCar()
				.then(res => {
					concessionnaire = res;
				})
				.catch(err => console.log(err));

			const searchedCar = concessionnaire!.filter(
				c =>
					c.maker === makerCar &&
					c.model === modelCar &&
					c.year == (yearCar as number),
			)[0];

			const embed = new EmbedBuilder()
				.setTitle('Achat véhicule')
				.setAuthor({
					name: embedMessage.author!.name as string,
				})
				.setColor('#00FF00')
				.setTimestamp()
				.setThumbnail(searchedCar.pictureLink)
				.addFields(
					{
						name: embedMessage.fields[0].name,
						value: embedMessage.fields[0].value,
						inline: true,
					},
					{
						name: embedMessage.fields[1].name,
						value: embedMessage.fields[1].value,
						inline: true,
					},
					{
						name: embedMessage.fields[2].name,
						value: embedMessage.fields[2].value,
						inline: true,
					},
					{
						name: 'Prix :',
						value: searchedCar.price.toString(),
						inline: true,
					},
					{
						name: 'Propriétaire : ',
						value: member.displayName,
						inline: true,
					},
				);

			await MoneyController.removeMoney(
				member.id,
				searchedCar.price,
				false,
			).then(async res => {
				if (res.status == 200) {
					const moneyDTO = res.data as GetMoneyDTO;

					await CarController.addCar(searchedCar, member.id).catch(err =>
						console.log(err),
					);
					await removeMoneyRapport(
						member! as GuildMember,
						moneyDTO,
						searchedCar.price,
					).catch(err => console.log(err));
					return message.edit({ embeds: [embed], components: [] });
				} else {
					await message.react('❌');
					return message.edit({
						content: interactionLang.notEnoughtMoney,
						embeds: [],
						components: [],
					});
				}
			});
		} catch (error) {
			console.log('Error : ', error);
			return button.reply(lang.bot.errorMessage);
		}
	}
}
