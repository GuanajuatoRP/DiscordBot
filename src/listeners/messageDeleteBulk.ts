import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { LogsEmbed } from '../tools/export';
import lang from '../tools/language.json';
import { ColorResolvable, Guild, TextChannel } from 'discord.js';
const eventLang = lang.event.messageBulkDelete;
import appConf from '../util/appConfig.json';

export class MessageDeleteBulk extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'messageDeleteBulk', {
			description: eventLang.description,
			once: false,
		});
	}

	async execute(messages: any) {
		const guild = this.client.guilds.cache.get(
			messages.first().guildId,
		) as Guild;
		const auditLogs = await guild.fetchAuditLogs({
			limit: 1,
			type: 73,
		});
		const executor = auditLogs.entries.first()!.executor;

		let Embed = LogsEmbed(executor!.username, executor!.id);
		Embed.setColor(eventLang.embed.color as ColorResolvable);
		Embed.setAuthor({ name: eventLang.embed.author });
		Embed.addFields({
			name: eventLang.embed.fields.salon.name,
			value: `${guild.channels.cache.get(messages.first().channelId)!.name}`,
			inline: true,
		});

		const channel = guild.channels.cache.get(
			appConf.chanels.staff.botLog,
		) as TextChannel;
		channel.send({ embeds: [Embed] });
	}
}
