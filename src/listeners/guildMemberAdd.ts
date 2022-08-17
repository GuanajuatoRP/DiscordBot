import { EmbedBuilder } from 'discord.js';
import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { GuildMember, TextChannel } from 'discord.js';
import lang from '../tools/language.json';
const eventLang = lang.event.guildMemberAdd;
import appconf from '../util/appConfig.json';

export class GuildMemberAdd extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'guildMemberAdd', {
			description: eventLang.description,
			once: false,
		});
	}

	execute(member: GuildMember) {
		// send Log
		let embed = new EmbedBuilder()
			.setColor(0x57f287)
			.setAuthor({ name: '[+] {0}'.format(member.user.tag) })
			.setDescription(eventLang.embed.description.format(member.displayName))
			.setFooter({ text: 'GuildMember Add' })
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
