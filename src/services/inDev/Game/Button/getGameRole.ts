import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { ButtonInteraction, GuildMember, Role } from 'discord.js';
import appConfig from '../../../../Util/appConfig.json';

export class GetGameRoleBtns extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['GetGameRole']);
	}

	async execute(button: ButtonInteraction) {
		await button.deferUpdate();
		const embed = button.message.embeds[0];
		const member = button.member as GuildMember;
		const RoleA = button.guild!.roles.cache.get(appConfig.Roles.GMA) as Role;
		const RoleB = button.guild!.roles.cache.get(appConfig.Roles.GMB) as Role;

		if (embed.fields.some(f => f.value.includes(member.displayName))) {
			// gives the role to the user according to the embed
			if (
				button.message.embeds[0].fields![0].value.indexOf(member.displayName) !=
				-1
			) {
				member.roles.add(RoleA);
			} else {
				member.roles.add(RoleB);
			}
		}
	}
}
