import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { TextChannel, Invite, Guild, ColorResolvable } from 'discord.js';
import lang from '../tools/language.json';
import { LogsEmbed } from '../tools/export';
const eventLang = lang.event.invitationCreate;
import appConf from '../util/appConfig.json';

export class InviteCreate extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'inviteCreate', {
			description: '',
			once: false,
		});
	}

	async execute(invite: Invite) {
		const guild = invite.guild as Guild;
		const auditLogs = await guild.fetchAuditLogs({
			limit: 1,
			type: 40,
		});
		const executor = auditLogs.entries.first()!.executor;

		let Embed = LogsEmbed(executor!.username, executor!.id);
		Embed.setColor(eventLang.embed.color as ColorResolvable);
		Embed.setAuthor({ name: eventLang.embed.author });
		Embed.addFields(
			{
				name: eventLang.embed.fields.link.name,
				value: `${invite.url}`,
				inline: true,
			},
			{
				name: eventLang.embed.fields.code.name,
				value: `${invite.code}`,
				inline: true,
			},
			{
				name: eventLang.embed.fields.salon.name,
				value: `${invite.channel}`,
				inline: true,
			},
		);

		const channel = guild.channels.cache.get(
			appConf.chanels.staff.botLog,
		) as TextChannel;
		channel!.send({ embeds: [Embed] });
	}
}
