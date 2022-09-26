import { Command } from 'sheweny';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
} from 'discord.js';
import appConfig from '../../../../Util/appConfig.json';
import lang from '../../../../Tools/language.json';
const cmdLang = lang.commands.role;

export class RoleCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'role',
			category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);
		try {
			i.guild!.channels.fetch(appConfig.chanels.game.salleDeJeux).then(
				channel => {
					const guildChannel = channel;
					const membersOfChannel = Array.from(guildChannel!.members);

					let role = DefaultEmbed();
					let teamA = new Array();
					let teamB = new Array();

					// boucle sur la moitier supérieur du nombre de personne dans le salons salle de jeux
					for (let i = 0; i < Math.ceil(membersOfChannel.length / 2); i++) {
						// fournis un nombre random entre 0 et le nombre de personne dans le salon
						let idx =
							Math.floor(Math.random() * (membersOfChannel.length - 0)) + 0;
						// récupère puis push le user dans team A
						let member = membersOfChannel[idx];
						teamA.push(
							member[1].nickname != null
								? member[1].nickname
								: member[1].user.username,
						);
						// delete user de la liste
						membersOfChannel.splice(membersOfChannel.indexOf(member), 1);
					}
					// add les user restant a la 2ème team
					membersOfChannel.forEach(member => {
						teamB.push(
							member[1].nickname != null
								? member[1].nickname
								: member[1].user.username,
						);
					});

					role.setAuthor({ name: cmdLang.embed.Author });

					if (membersOfChannel.length > 0) {
						role.addFields(
							{
								name: cmdLang.embed.Fields[0].teamname,
								value: `${teamA.join(',')}`,
								inline: false,
							},
							{
								name: cmdLang.embed.Fields[1].teamname,
								value: `${teamB.join(',')}`,
								inline: false,
							},
						);
						const btGetRole =
							new ActionRowBuilder<ButtonBuilder>().addComponents(
								new ButtonBuilder()
									.setCustomId('GetGameRole')
									.setLabel(cmdLang.bouton.label)
									.setStyle(ButtonStyle.Primary),
							);
						return i.reply({
							embeds: [role],
							components: [btGetRole],
						});
					} else {
						return i.reply({
							content: cmdLang.i.error.content,
							ephemeral: true,
						});
					}
				},
			);
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
