import { Event } from 'sheweny';
import { ColorResolvable, GuildBan, TextChannel } from 'discord.js';
import { LogsEmbed } from '../../../Tools/Exports/export';
import type { ShewenyClient } from 'sheweny';
import lang from '../../../Tools/language.json';
const eventLang = lang.event.guildBanRemove;
import appConf from '../../../Util/appConfig.json';

export class GuildBanRemove extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'guildBanRemove', {
			description: eventLang.description,
			once: false,
		});
	}

	async execute(ban: GuildBan) {
		const auditLogs = await ban.guild.fetchAuditLogs({
			limit: 1,
			type: 23,
		});
		const executor = auditLogs.entries.first()!.executor;
		let embed = LogsEmbed(executor!.username, executor!.id);
		embed.setColor(eventLang.embed.color as ColorResolvable);
		embed.setAuthor({ name: eventLang.embed.author });
		embed.addFields({
			name: eventLang.embed.fields.unban.name.format(ban.user.tag, ban.user.id),
			value: eventLang.embed.fields.reason.name.format(ban.reason!),
			inline: false,
		});

		const channel = ban.guild.channels.cache.get(
			appConf.chanels.staff.botLog,
		) as TextChannel;
		channel.send({
			embeds: [embed],
		});
	}
}
