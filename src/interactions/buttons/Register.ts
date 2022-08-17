import { DefaultEmbed } from '../../tools/export';
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	GuildMember,
	GuildMemberRoleManager,
	Role,
} from 'discord.js';
import appConf from '../../util/appConfig.json';
import lang from '../../tools/language.json';
import RegisterController from '../../APIToUserApi/RegisterController';
import { StatusCodes } from 'http-status-codes';
const interactionLang = lang.intercation.button.register;
export class RegisterBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['Register']);
	}

	async execute(button: ButtonInteraction) {
		// Get Member and this roles
		const member = button.member as GuildMember;
		const memberRoles = member.roles as GuildMemberRoleManager;
		const RoleInscrit = button.guild!.roles.cache.get(
			appConf.Roles.INSCRIT,
		) as Role;

		// Check if this user is already registred
		let httpcode: StatusCodes = StatusCodes.OK;
		await RegisterController.UserExist(member.id).then(res => {
			httpcode = res.status == 200 ? StatusCodes.OK : StatusCodes.NO_CONTENT;
		});

		if (
			memberRoles.cache.has(appConf.Roles.INSCRIT) == true ||
			httpcode == StatusCodes.OK
		) {
			memberRoles.add(RoleInscrit);
			return button.reply({
				content: interactionLang.AlreadyRegistred,
				ephemeral: true,
			});
		}

		// Create new embed and button link to send in dm on member
		let embed = DefaultEmbed();
		embed.setDescription(interactionLang.embedGoodResponse.description);

		const btLink = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setLabel(interactionLang.button.label)
				.setStyle(ButtonStyle.Link)
				.setURL(
					process.env.WEBSITE_URL + appConf.Api.RegisterLink.format(member.id),
				),
		);

		// Explain at member the futur new DM
		await button.reply({
			content: interactionLang.buttonReply.content,
			ephemeral: true,
		});

		// After 2Sec send DM
		return setTimeout(() => {
			member.send({
				embeds: [embed],
				components: [btLink],
			});
		}, 2000);
	}
}
