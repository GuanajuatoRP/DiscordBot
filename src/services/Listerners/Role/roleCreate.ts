import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { TextChannel, Role, ColorResolvable } from 'discord.js';
import { LogsEmbed } from '../../../tools/export';
import lang from '../../../tools/language.json';
const eventLang = lang.event.roleCreate;
import appConf from '../../../util/appConfig.json';

export class RoleCreate extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'roleCreate', {
			description: eventLang.description,
			once: false,
		});
	}

	async execute(role: Role) {
		const auditLogs = await role.guild.fetchAuditLogs({
			limit: 1,
			type: 30,
		});
		const executor = auditLogs.entries.first()!.executor;

		let Embed = LogsEmbed(executor!.username, executor!.id);
		Embed.setColor(eventLang.embed.color as ColorResolvable);
		Embed.setAuthor({ name: eventLang.embed.author });
		Embed.addFields(
			{
				name: eventLang.embed.fields.roleName.name,
				value: `${role.name}`,
				inline: true,
			},
			{
				name: eventLang.embed.fields.roleId.name,
				value: `${role.id}`,
				inline: true,
			},
		);
		Embed.setFooter({
			text: `Cette action a été réalisée par ${executor!.username} -> id : ${
				executor!.id
			}`,
		});

		const channel = role.guild.channels.cache.get(
			appConf.chanels.staff.botLog,
		) as TextChannel;
		channel!.send({ embeds: [Embed] });
	}
}
