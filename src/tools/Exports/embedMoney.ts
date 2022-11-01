import { GetMoneyDTO } from './../../APIToUserApi/Models/GetMoneyDTO';
import {
	EmbedBuilder,
	ColorResolvable,
	GuildMember,
	TextChannel,
} from 'discord.js';
import { commands } from '../language.json';
import { chanels } from '../../Util/appConfig.json';
const { adminMoney } = commands;

export const removeMoneyRapport = async (
	member: GuildMember,
	moneyDTO: GetMoneyDTO,
	removedValue: number,
	motif: string,
) => {
	const embedMoney = new EmbedBuilder()
		.setTitle(adminMoney.embed.title.format(member.displayName))
		.setThumbnail(member.displayAvatarURL() as string)
		.setAuthor({
			name: '𝑳𝒂 𝒃𝒂𝒏𝒒𝒖𝒆',
			url: 'https://discord.com/channels/854140376867930122/1001952467786932244/1002182894632050708',
		});
	embedMoney.setColor('#f00' as ColorResolvable);
	embedMoney
		.addFields(
			{
				name: adminMoney.embed.fieldsNames.remove,
				value: `${removedValue}€`,
			},
			{
				name: adminMoney.embed.fieldsNames.newSolde,
				value: `${moneyDTO.money}€`,
			},
		)
		.setTimestamp()
		.setFooter({ text: `Motif : ${motif}` });

	const banqueChannel = (await member.guild!.channels.fetch(
		chanels.rp.banque,
	)) as TextChannel;

	await banqueChannel!.send({
		content: adminMoney.message.content.format(member.id),
		embeds: [embedMoney],
	});
};
export const addMoneyRapport = async (
	member: GuildMember,
	moneyDTO: GetMoneyDTO,
	addedValue: number,
	motif: string,
) => {
	const embedMoney = new EmbedBuilder()
		.setTitle(adminMoney.embed.title.format(member.displayName))
		.setThumbnail(member.displayAvatarURL() as string)
		.setAuthor({
			name: '𝑳𝒂 𝒃𝒂𝒏𝒒𝒖𝒆',
			url: 'https://discord.com/channels/854140376867930122/1001952467786932244/1002182894632050708',
		});
	embedMoney
		.setColor('#11ff00' as ColorResolvable)
		.addFields({
			name: commands.adminMoney.embed.fieldsNames.add,
			value: `${addedValue}€`,
		})
		.setTimestamp()
		.setFooter({ text: `Motif : ${motif}` });

	if (moneyDTO.money < 0) {
		embedMoney.addFields(
			{
				name: commands.adminMoney.embed.fieldsNames.newSolde,
				value: `⚠️⚠️${moneyDTO.money}€⚠️⚠️`,
			},
			{
				name: commands.adminMoney.embed.fields.decouvert.name,
				value: commands.adminMoney.embed.fields.decouvert.value,
			},
		);
	} else {
		embedMoney.addFields({
			name: commands.adminMoney.embed.fieldsNames.newSolde,
			value: `${moneyDTO.money}€`,
		});
	}

	const banqueChannel = (await member.guild!.channels.fetch(
		chanels.rp.banque,
	)) as TextChannel;

	await banqueChannel!.send({
		content: adminMoney.message.content.format(member.id),
		embeds: [embedMoney],
	});
};
export const virementMoneyRapport = async (
	memberHaveMoney: GuildMember,
	moneyDTO: GetMoneyDTO,
	memberToSendMoney: GuildMember,
	money2DTO: GetMoneyDTO,
	sendedValue: number,
) => {
	const banqueChannel = (await memberHaveMoney.guild!.channels.fetch(
		chanels.rp.banque,
	)) as TextChannel;

	await banqueChannel!.send({
		content:
			`<@{0}> a envoyé {1}€ à <@{2}>. Il lui reste {3}€ et <@{2}> a maintenant {4}€`.format(
				memberHaveMoney.id,
				sendedValue.toString(),
				memberToSendMoney.id,
				moneyDTO.money.toString(),
				money2DTO.money.toString(),
			),
	});
};
