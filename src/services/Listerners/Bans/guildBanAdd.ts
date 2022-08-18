import { Event } from 'sheweny';
import { LogsEmbed } from '../../../tools/export';
import type { ShewenyClient } from 'sheweny';
import type { GuildBan, TextChannel } from 'discord.js';
import appConf from '../../../util/appConfig.json';
import lang from '../../../tools/language.json';
const eventLang = lang.event.guildBanAdd;

export class GuildBanAdd extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'guildBanAdd', {
			description: eventLang.description,
			once: false,
		});
	}

	async execute(ban: GuildBan) {
		const auditLogs = await ban.guild.fetchAuditLogs({
			limit: 1,
			type: 22,
		});
		const executor = auditLogs.entries.first()!.executor;
		let embed = LogsEmbed(executor!.username, executor!.id);
		embed.setAuthor({ name: eventLang.embed.author });
		embed.addFields({
			name: eventLang.embed.fields.ban.name.format(ban.user.tag, ban.user.id),
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
