import { CarDTO } from './../../../../APIToUserApi/Models/CarDTO';
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ButtonInteraction,
	ColorResolvable,
	Embed,
	GuildMember,
	Message,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
import MoneyController from '../../../../APIToUserApi/MoneyController';
import { GetMoneyDTO } from '../../../../APIToUserApi/Models/GetMoneyDTO';
import CarController from '../../../../APIToUserApi/CarController';
import { virementMoneyRapport } from '../../../../Tools/Exports/embedMoney';
const interactionLang = lang.button.AchatPersoCar;

export class VentePersoAchatBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['VentePersoAcheter']);
	}

	async execute(button: ButtonInteraction) {
		try {
			const member = button.member as GuildMember;
			const message = button.message as Message;
			const messageEmbed = message.embeds[0] as Embed;
			const embedOwnerTag = messageEmbed.footer?.text.split(' : ')[1].trim();
			const embedOwner: GuildMember = member.guild.members.cache.find(
				m => m.user.tag == embedOwnerTag,
			)!;

			const carPrice = parseInt(
				messageEmbed.fields.find(f => f.name == 'Prix de vente')
					?.value as string,
			);

			// check if member can user button
			if (messageEmbed.footer?.text.split(' : ')[1].includes(member.user.tag)) {
				return button.reply({
					content: interactionLang.button.cantUse,
					ephemeral: true,
				});
			}

			let car: CarDTO;
			await CarController.getUserAllCar(embedOwner.id).then(res => {
				car = res.find(
					c => `${c.maker} ${c.model} ${c.year}` == messageEmbed.author?.name,
				) as CarDTO;
				if (!car) {
					return button.reply({
						content: `La voiture ${messageEmbed.author?.name} n'existe pas`,
						ephemeral: true,
					});
				}
			});

			let money: GetMoneyDTO;
			let money2: GetMoneyDTO;
			await MoneyController.removeMoney(member.id, carPrice, false).then(
				async res => {
					money = res.data;
					await MoneyController.addMoney(embedOwner.id, carPrice).then(
						res => (money2 = res.data),
					);
				},
			);

			await CarController.changeUser(car!, member.id).then(() => {
				virementMoneyRapport(member, money, embedOwner, money2, carPrice);
			});

			let Newembed = DefaultEmbed()
				.setTitle(messageEmbed.author?.name as string)
				.setDescription(interactionLang.embed.description as string)
				.setColor(interactionLang.embed.color as ColorResolvable)
				.setThumbnail(member.displayAvatarURL())
				.addFields({
					name: interactionLang.embed.fields.Vente.name.format(
						member.displayName,
					),
					value: interactionLang.embed.fields.Vente.value.format(
						carPrice.toString(),
					),
					inline: true,
				});
			message.react('✅');

			return button.update({
				embeds: [Newembed],
				components: [],
			});
		} catch (error: any) {
			if (error.response.data == 'NOT_ENOUGH_MONEY') {
				console.log(error);
				return button.reply({
					content: "Vous n'averz pas suffisament d'argent",
					ephemeral: true,
				});
			} else {
				console.log(error);
				return button.reply({
					content: lang.bot.errorMessage,
					ephemeral: true,
				});
			}
		}
	}
}
