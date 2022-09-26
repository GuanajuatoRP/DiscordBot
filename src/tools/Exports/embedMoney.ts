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
