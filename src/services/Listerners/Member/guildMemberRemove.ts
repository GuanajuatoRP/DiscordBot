import { EmbedBuilder } from 'discord.js';
import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { GuildMember, TextChannel } from 'discord.js';
import lang from '../../../Tools/language.json';
const eventLang = lang.event.guildMemberRemove;
import appconf from '../../../Util/appConfig.json';

export class GuildMemberRemove extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'guildMemberRemove', {
			description: eventLang.description,
			once: false,
		});
	}

	execute(member: GuildMember) {
		let embed = new EmbedBuilder()
			.setColor(0xed4245)
			.setAuthor({ name: '[-] {0}'.format(member.user.tag) })
			.setDescription(eventLang.embed.description.format(member.displayName))
			.setFooter({ text: 'GuildMember Remove' })
			.setTimestamp()
			.setThumbnail(member.user.displayAvatarURL());

		const channel = member.guild.channels.cache.get(
			appconf.chanels.staff.serverLog,
		) as TextChannel;
		channel.send({
			embeds: [embed],
		});
	}
}
