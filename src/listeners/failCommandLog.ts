import { LogsEmbed, padTo2Digits } from '../tools/export';
import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	AttachmentBuilder,
	ColorResolvable,
	CommandInteraction,
	GuildMember,
	TextChannel,
} from 'discord.js';
import lang from '../tools/language.json';
const eventLang = lang.event.failCommandLog;
import appConf from '../util/appConfig.json';
import fs from 'fs';
import path from 'path';

export class FailCommandLog extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'FailCommandLog', {
			description: eventLang.description,
			once: false,
		});
	}

	execute(i: CommandInteraction, e: Error) {
		const member = i.member as GuildMember;

		const Embed = LogsEmbed(member.displayName, member.id);
		Embed.setAuthor({ name: eventLang.embed.author });
		Embed.setColor(eventLang.embed.color as ColorResolvable);
		Embed.data.fields!.push({
			name: eventLang.embed.fields.commandName.name,
			value: i.commandName,
			inline: true,
		});
		Embed.data.fields!.push({
			name: eventLang.embed.fields.salon.name,
			value: i.guild!.channels.cache.get(i.channelId)!.name,
			inline: true,
		});
		Embed.setTimestamp();
		const channel = i.guild!.channels.cache.get(
			appConf.chanels.staff.botLog,
		) as TextChannel;

		//* Get and format date at "dd-mm-YYYY hh:mm:ss"
		const d = new Date();
		const today = [
			d.getFullYear(),
			padTo2Digits(d.getMonth() + 1),
			padTo2Digits(d.getDate()),
		].join('-');
		const time = [
			padTo2Digits(d.getHours()),
			padTo2Digits(d.getMinutes()),
			padTo2Digits(d.getSeconds()),
		].join('-');

		if (!fs.existsSync(path.join(process.cwd(), `/logs/${today}`)))
			fs.mkdirSync(path.join(process.cwd(), `/logs/${today}`));

		//create string of full option dans option value of command
		const commandOptionValue = i.options.data
			.map(o => `Option Name : ${o.name}, value : ${o.value}`)
			.join(', ') as string;
		const log = `$Command : ${i.commandName}, ${
			commandOptionValue != '' ? `${commandOptionValue}, ` : ''
		}channel : ${i.guild!.channels.cache.get(i.channelId)!.name} User : ${
			member.displayName
		}, UserID : ${member.id}\n\n Error : ${e}`;

		try {
			// send log in txt file
			fs.appendFileSync(
				path.join(process.cwd(), `/logs/${today}/failCommandLog_${time}.txt`),
				log + '\n',
			);

			const attachment = new AttachmentBuilder(Buffer.from(log, 'utf-8'), {
				name: 'Error.txt',
			});
			const user = i.guild!.members.cache.get(
				appConf.botConfig.dercrakerId,
			) as GuildMember;
			user.send({ embeds: [Embed], files: [attachment] });
		} catch (error) {
			console.log(error);
		}

		// Send Embed log in channellogs on discord
		return channel.send({
			embeds: [Embed],
		});
	}
}
