import { EmbedBuilder } from 'discord.js';
import { PermissionOverwrites } from 'discord.js';
import fs from 'fs';
import path from 'path';
import lang from '../language.json';

//* Permet de save un embed Pour la commande créate embed
export const saveEmbed = (embed: EmbedBuilder) => {
	fs.writeFile(
		path.join(__dirname, './customEmbed.json'),
		JSON.stringify(embed),
		function writeJSON(err) {
			if (err) return console.log(err);
		},
	);
};

//* Embed par def
export const DefaultEmbed = () => {
	return new EmbedBuilder()

		.setAuthor({
			name: lang.embeds.default.author,
			iconURL:
				'https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg',
			url: 'https://discord.gg/BtkWVH2Kq9',
		})
		.setColor('#ff8000')
		.setFooter({
			text: lang.embeds.default.footer,
			iconURL:
				'https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg',
		})
		.setTimestamp()
		.addFields();
};

//* Embed utilisé pour logger
export const LogsEmbed = (name: string, id: string) => {
	return new EmbedBuilder()
		.setAuthor({ name: lang.embeds.LogsEmbed.author })
		.setColor('#ff0000')
		.setTimestamp()
		.setFooter({ text: lang.embeds.LogsEmbed.footer.format(name, id) })
		.addFields();
};

//* est utilisée a la save de channelles avec la command /getcategory
export class ChannelClass {
	public name: String = '';
	public channelInfo: ChannelInfo = new ChannelInfo();
	public messages: Array<any> = [];
}

export class ChannelInfo {
	public type = 0 || 2;
	public topic: string = '';
	public permissionOverwrites: Array<PermissionOverwrites> = [];
	public position: number = 0;
	public userLimit: number = 0;
}

//* Autocomplete /inscription
export enum PermisTypes {
	Probatoire = 'Probatoire',
	Définitif = 'Définitif',
	Stage_B = 'Stage_B',
	Stage_A = 'Stage_A',
	Stage_S1 = 'Stage_S1',
	Stage_S2 = 'Stage_S2',
}

//* define new methode for String type
declare global {
	interface String {
		format(...replacements: string[]): string;
	}
}

//* format method for String type
// String.prototype.format(arg,arg,...)
// formatter like String.format in c#
//* '{0}anyString{1}'.format(var1,var2) == 'var1anyStringvar2'
if (!String.prototype.format) {
	String.prototype.format = function () {
		var args = arguments;
		// regex to find '{d}' with digit match to index args.
		return this.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}
