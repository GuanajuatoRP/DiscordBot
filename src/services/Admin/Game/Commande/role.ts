import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	VoiceChannel,
} from 'discord.js';
import appConfig from '../../../../Util/appConfig.json';
import UserController from '../../../../APIToUserApi/UserController';
import { UserDTO } from '../../../../APIToUserApi/Models/UserDTO';
import { shuffleArray } from '../../../../Tools/Exports/shuffkeArray';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
const { Roles } = appConfig;
import lang from '../../../../Tools/language.json';
const serviceLang = lang.services.game;
const cmdLang = serviceLang.commandInformation.role;

export class RoleCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'role',
			category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Integer,
					name: 'nb-team-b',
					description: cmdLang.slashOptions.nbTeamB,
					max_value: 12,
					min_value: 1,
					required: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);

		await i.deferReply();

		try {
			const guildChannel = (await i.guild!.channels.fetch(
				appConfig.chanels.game.salleDeJeux,
			)) as VoiceChannel;

			if (!guildChannel) i.editReply({ content: serviceLang.errors.noChannel });

			const membersIdOfChannel = guildChannel.members
				.filter(
					m => !m.roles.cache.has(Roles.GMA) && !m.roles.cache.has(Roles.GMB),
				)
				.map(m => m);

			let userDTOOfChannel = (await UserController.getUsersByDiscordIds(
				membersIdOfChannel.map(m => m.id),
			)) as UserDTO[];

			userDTOOfChannel = shuffleArray(userDTOOfChannel);
			userDTOOfChannel = userDTOOfChannel.sort((a: UserDTO, b: UserDTO) => {
				return (
					b.nbSessions -
					b.nbSessionsPolice * 2 -
					(a.nbSessions - a.nbSessionsPolice * 2)
				);
			});

			let role = DefaultEmbed();
			let teamB = userDTOOfChannel
				.slice(0, i.options.get('nb-team-b', true).value as number)
				.map(m => m.username);

			let teamA = userDTOOfChannel
				.slice(
					i.options.get('nb-team-b', true).value as number,
					userDTOOfChannel.length,
				)
				.map(m => m.username);

			role.setAuthor({ name: serviceLang.Components.embeds.role.author });

			if (membersIdOfChannel.length > 0) {
				role.addFields(
					{
						name: serviceLang.Components.embeds.role.fields.teamA,
						value: `${teamA.join(', ')}`,
						inline: false,
					},
					{
						name: serviceLang.Components.embeds.role.fields.teamB,
						value: `${teamB.join(', ')}`,
						inline: false,
					},
				);
				const btGetRole = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId('GetGameRole')
						.setLabel(serviceLang.Components.buttons.role.labels.getRole)
						.setStyle(ButtonStyle.Primary),
				);
				return i.editReply({
					embeds: [role],
					components: [btGetRole],
				});
			} else {
				return i.editReply({
					content: serviceLang.errors.minimalUser,
				});
			}
		} catch (error) {
			console.log(error);
			await this.client.emit('ErrorCommandLog', i, error);
			i.editReply(lang.bot.errorMessage);
		}
	}
}
