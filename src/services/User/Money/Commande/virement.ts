import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	TextChannel,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
import MoneyController from '../../../../APIToUserApi/MoneyController';
import { chanels } from '../../../../Util/appConfig.json';
const cmdLang = lang.commands.virement;

export class VirementCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'virement',
			category: 'RôlePlay', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: 'utilisateur',
					description: cmdLang.slashOptions.utilisateur,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: 'somme',
					description: cmdLang.slashOptions.somme,
					required: true,
					min_value: 1,
					max_value: 1000000000,
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
			await i.deferReply({ ephemeral: true });

			const memberHaveMoney: GuildMember = i.member as GuildMember;
			const memberToSendMoney: GuildMember = i.options.getMember(
				'utilisateur',
			) as GuildMember;
			const moneyToSend: number = i.options.get('somme', true).value as number;
			const banqueChannel: TextChannel = i.guild!.channels.cache.get(
				chanels.rp.banque,
			) as TextChannel;

			await MoneyController.removeMoney(memberHaveMoney.id, moneyToSend, false)
				.then(async result => {
					const moneyDTO = result.data;

					await MoneyController.addMoney(
						memberToSendMoney.id,
						moneyToSend,
					).then(async res => {
						const moneyDTO2 = res.data;

						await banqueChannel.send(
							cmdLang.interaction.public.format(
								memberHaveMoney.id,
								moneyToSend.toString(),
								memberToSendMoney.id,
								moneyDTO.money,
								moneyDTO2.money,
							),
						);

						i.editReply({
							content: cmdLang.interaction.personal.format(
								moneyToSend.toString(),
								memberToSendMoney.id,
								moneyDTO.money,
								moneyDTO2.money,
							),
						});
					});
				})
				.catch(err => {
					switch (err.response.data) {
						case 'NOT_ENOUGH_MONEY':
							return i.editReply(
								cmdLang.interaction.notEnoughMoney.format(
									memberHaveMoney.id,
									moneyToSend.toString(),
									memberToSendMoney.id,
								),
							);
						case 'USER_NOT_FOUND':
							MoneyController.addMoney(memberHaveMoney.id, moneyToSend);
							return i.editReply(
								cmdLang.interaction.userNotExist.format(memberToSendMoney.id),
							);
						default:
							console.log(err);
							this.client.emit('ErrorCommandLog', i, err);
							return i.editReply(lang.bot.errorMessage);
					}
				});
		} catch (error) {
			console.log(error);
			await i.reply(lang.bot.errorMessage);
			return this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
