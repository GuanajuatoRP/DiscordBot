import type { CommandInteraction } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { commands } from '../language.json';
const cmdLang = commands.getCommandLogs;
const getLogFile = async (logType: LogType, i: CommandInteraction) => {
	if (!i.options.data[0].options) {
		return i.reply('ça marche pas');
	}

	const date = i.options!.data[0]!.options[0].value as string;
	const time = i.options!.data[0]!.options[1]?.value as string | undefined;

	const dateList = readdirSync(
		join(process.cwd(), `${time ? `/logs/${date}/` : '/logs/'}`),
	)
		.filter(file => file.startsWith(logType))
		.map(date => date.slice(time ? -12 : -14, -4)) as Array<string>;

	if (!dateList.includes(!time ? date : time)) {
		return i.reply({
			content: cmdLang.i.dateError,
			ephemeral: true,
		});
	}

	let content: string;
	let file: string[];
	switch (logType) {
		case 'command':
			content = cmdLang.i.commandContent.format(date);
			file = [join(process.cwd(), `/logs/commandLog_${date}.txt`)];
			break;
		case 'admin':
			content = cmdLang.i.adminContent.format(date);
			file = [join(process.cwd(), `/logs/adminCommandLog_${date}.txt`)];
			break;
		case 'error':
			content = cmdLang.i.errorContent.format(date, time as string);
			file = [join(process.cwd(), `/logs/${date}/errorCommandLog_${time}.txt`)];
			break;
	}

	return i.reply({
		content: content,
		files: file,
		ephemeral: true,
	});
};

type LogType = 'command' | 'admin' | 'error';
export default getLogFile;
