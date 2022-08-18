import { GetMoneyDTO } from '../../../../APIToUserApi/Models/GetMoneyDTO';
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	ColorResolvable,
} from 'discord.js';
import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';
import lang from '../../../../tools/language.json';
import MoneyController from '../../../../APIToUserApi/MoneyController';
const cmdLang = lang.commands.adminMoney;

export class AdminMoneyCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'adminmoney',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: 'user',
					description: cmdLang.slashOptions.user as string,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'action',
					description: cmdLang.slashOptions.action as string,
					required: true,
					choices: [
						{ name: 'Add', value: 'Add' },
						{ name: 'Remove', value: 'Remove' },
						{ name: 'Set', value: 'Set' },
					],
				},
				{
					type: ApplicationCommandOptionType.Number,
					name: 'montant',
					description: cmdLang.slashOptions.amount as string,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'raison',
					description: cmdLang.slashOptions.reason as string,
					required: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			//clientPermissions : []
		});
	}
	async execute(interaction: CommandInteraction) {
		this.client.emit('AdminCommandLog', interaction as CommandInteraction);

		await interaction.deferReply();

		const user: GuildMember = interaction.options.get('user')!
			.member as GuildMember;
		const action: string = interaction.options.get('action')!.value as string;
		const montant: number = interaction.options.get('montant')!.value as number;
		const raison: string = interaction.options.get('raison')!.value as string;

		let embedMoney = new EmbedBuilder()
			.setTitle(cmdLang.embed.title.format(user.displayName))
			.setThumbnail(
				(interaction.member! as GuildMember).displayAvatarURL() as string,
			)
			.setAuthor({
				name: '𝑳𝒂 𝒃𝒂𝒏𝒒𝒖𝒆',
				url: 'https://discord.com/channels/854140376867930122/1001952467786932244/1002182894632050708',
			})
			.setTimestamp()
			.setFooter({ text: `Motif : ${raison}` });

		try {
			switch (action) {
				case 'Add':
					await MoneyController.addMoney(user.id, montant).then(response => {
						const moneyDTO: GetMoneyDTO = response.data as GetMoneyDTO;
						embedMoney.setColor('#11ff00' as ColorResolvable);
						embedMoney.addFields(
							{
								name: cmdLang.embed.fieldsNames.add,
								value: `${montant}€`,
							},
							{
								name: cmdLang.embed.fieldsNames.newSolde,
								value: `${moneyDTO.money}€`,
							},
						);
					});
					break;
				case 'Remove':
					await MoneyController.removeMoney(user.id, montant).then(response => {
						const moneyDTO: GetMoneyDTO = response.data as GetMoneyDTO;
						embedMoney.setColor('#f00' as ColorResolvable);
						embedMoney.addFields(
							{
								name: cmdLang.embed.fieldsNames.remove,
								value: `${montant}€`,
							},
							{
								name: cmdLang.embed.fieldsNames.newSolde,
								value: `${moneyDTO.money}€`,
							},
						);
					});
					break;
				case 'Set':
					await MoneyController.setMoney(user.id, montant).then(response => {
						const moneyDTO: GetMoneyDTO = response.data as GetMoneyDTO;
						embedMoney.setColor('#FFA500' as ColorResolvable);
						embedMoney.addFields({
							name: cmdLang.embed.fieldsNames.set,
							value: `${moneyDTO.money}€`,
						});
					});
					break;
			}
		} catch (error: any) {
			interaction.editReply(lang.bot.errorMessage);
			return this.client.emit('FailCommandLog', interaction, error);
		}

		return interaction.editReply({
			embeds: [embedMoney],
		});
	}
}
