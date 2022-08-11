import { LogsEmbed } from './../util/export';
import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ColorResolvable,
	CommandInteraction,
	GuildMember,
	TextChannel,
} from 'discord.js';
import lang from '../util/language.json';
const eventLang = lang.event.adminCommandLog;
import appConf from '../util/appConfig.json';
export class CommandLog extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'AdminCommandLog', {
			description: eventLang.description,
			once: false,
		});
	}

	execute(interaction: CommandInteraction) {
		const member = interaction.member as GuildMember;

		const Embed = LogsEmbed(member.displayName, member.id);
		Embed.setAuthor({ name: eventLang.embed.author });
		Embed.setColor(eventLang.embed.color as ColorResolvable);
		Embed.data.fields!.push({
			name: eventLang.embed.fields.commandName.name,
			value: interaction.commandName,
			inline: true,
		});
		Embed.data.fields!.push({
			name: eventLang.embed.fields.salon.name,
			value: interaction.guild!.channels.cache.get(interaction.channelId)!.name,
			inline: true,
		});
		Embed.setTimestamp();
		const channel = interaction.guild!.channels.cache.get(
			appConf.chanels.staff.commandLog,
		) as TextChannel;

		// //* Get and format date at "dd-mm-YYYY hh:mm:ss"
		// const d = new Date();
		// const today = [
		// 	d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`,
		// 	d.getMonth() + 1 > 9 ? d.getMonth() : `0${d.getMonth() + 1}`,
		// 	d.getFullYear(),
		// ].join('-');
		// const dformat =
		// 	today +
		// 	' ' +
		// 	[
		// 		d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`,
		// 		d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`,
		// 		d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`,
		// 	].join(':');

		// //create string of full option dans option value of command
		// const commandOptionValue = interaction.options.data
		// 	.map(o => `Option Name : ${o.name}, value : ${o.value}`)
		// 	.join(', ') as string;
		// const log = `${dformat}, Command : ${interaction.commandName}, ${
		// 	commandOptionValue != '' ? `${commandOptionValue}, ` : ''
		// }channel : ${
		// 	interaction.guild!.channels.cache.get(interaction.channelId)!.name
		// } User : ${member.displayName}, UserID : ${member.id}`;

		// TODO fix docker volume
		// send log in txt file
		// fs.appendFileSync(path.join(__dirname,`../util/logs/adminCommandLog_${today}.txt`), log+'\n')

		// Send Embed log in channellogs on discord
		return channel.send({
			embeds: [Embed],
		});
	}
}
