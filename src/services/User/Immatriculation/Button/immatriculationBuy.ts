import { removeMoneyRapport } from './../../../../Tools/Exports/embedMoney';
import { GetMoneyDTO } from '../../../../APIToUserApi/Models/GetMoneyDTO';
import { ToEditModel } from '../../../../APIToUserApi/Models/EditCarDTO';
import { CarDTO } from '../../../../APIToUserApi/Models/CarDTO';
import { IsEmbedOwner } from '../../../../Tools/Exports/isEmbedOwner';
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { EmbedBuilder } from 'discord.js';
import type {
	ButtonInteraction,
	GuildMember,
	Message,
	Embed,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import CarController from '../../../../APIToUserApi/CarController';
import MoneyController from '../../../../APIToUserApi/MoneyController';
const interactionLang = lang.button.ImmatriculationBuy;

export class ImmatriculationBuyBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['ImmatriculationBuy']);
	}

	async execute(button: ButtonInteraction) {
		try {
			const message = button.message as Message;
			const member = button.member as GuildMember;
			const embedMessage = message.embeds[0] as Embed;
			const immatriculation = embedMessage.fields[0].value as string;
			let isNegativeAccount = false;
			let car: CarDTO | undefined;

			if (!IsEmbedOwner(member, embedMessage)) {
				return button.reply({
					content: interactionLang.button.cantUse,
					ephemeral: true,
				});
			}

			await CarController.getUserAllCar(member.id)
				.then((cars: CarDTO[]) => {
					car = cars.find(
						car =>
							car.imatriculation == '' &&
							`${car.maker} ${car.model} ${car.year}` === embedMessage.title,
					);
				})
				.catch(err => console.log(err));

			if (!car) return button.reply('Aucune voiture trouvée');
			else car.imatriculation = immatriculation;

			await MoneyController.removeMoney(
				member.id,
				Number(embedMessage.fields[1].value),
			)
				.then(async res => {
					const moneyDTO = res.data as GetMoneyDTO;
					if (
						Number(moneyDTO.money) + Number(embedMessage.fields[1].value) <
						0
					) {
						await MoneyController.addMoney(
							member.id,
							Number(embedMessage.fields[1].value),
						);
						isNegativeAccount = true;
					} else {
						await CarController.editCar(ToEditModel(car!));
						await removeMoneyRapport(
							member,
							moneyDTO,
							Number(embedMessage.fields[1].value),
						);
					}
				})
				.catch(err => console.log(err));

			if (isNegativeAccount) {
				await message.react('❌');
				return button.update({
					content: interactionLang.notEnoughtMoney,
					embeds: [],
					components: [],
				});
			} else {
				const embed = new EmbedBuilder()
					.setTitle(embedMessage.title)
					.setAuthor({
						name: embedMessage.author!.name as string,
					})
					.setColor(embedMessage.color)
					.setTimestamp()
					.setThumbnail(member.displayAvatarURL())
					.setFooter({ text: embedMessage.footer!.text as string })
					.addFields({
						name: embedMessage.fields[0].name,
						value: embedMessage.fields[0].value,
					});
				await message.react('✅');
				return button.update({ embeds: [embed], components: [] });
			}
		} catch (error) {
			console.log('Error : ', error);
			return button.reply(lang.bot.errorMessage);
		}
	}
}
