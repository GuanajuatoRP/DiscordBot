import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction, GuildMember, TextChannel } from 'discord.js';
import lang from '../../../Tools/language.json';
import { LogsEmbed } from '../../../Tools/Exports/export';
import appConf from '../../../Util/appConfig.json';
const eventLang = lang.event.userMissingPermission;

export class userMissingPermissions extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'userMissingPermissions', {
			description: eventLang.description,
			emitter: client.managers.commands,
			once: false,
		});
	}

	execute(i: CommandInteraction) {
		const executor = i.member as GuildMember;

		const embed = LogsEmbed(executor.displayName, executor.id);
		embed.setAuthor({
			name: eventLang.embed.Author,
			iconURL: executor.user.displayAvatarURL(),
		});
		embed.data.fields!.push({
			name: eventLang.embed.fields.commandName.name,
			value: i.commandName,
			inline: true,
		});
		embed.data.fields!.push({
			name: eventLang.embed.fields.channel.name,
			value: i.guild!.channels.cache.get(i.channelId)!.name,
			inline: true,
		});

		const channel = i.guild!.channels.cache.get(
			appConf.chanels.staff.botLog,
		) as TextChannel;
		channel.send({
			embeds: [embed],
		});

		return i.reply({
			content: eventLang.i.content,
			ephemeral: true,
		});
	}
}
