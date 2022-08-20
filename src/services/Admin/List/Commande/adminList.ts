import { Command } from 'sheweny';
import { ApplicationCommandOptionType } from 'discord.js';
import { DefaultEmbed } from '../../../../Tools/Exports/export';
import fs from 'fs';
import path from 'path';
import type { ShewenyClient } from 'sheweny';
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import appConfig from '../../../../Util/appConfig.json';
import lang from '../../../../Tools/language.json';
const cmdLang = lang.commands.adminList;

export class AdminListCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'admin-list',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: 'add',
					description: cmdLang.slashOptions.add,
					autocomplete: true,
					required: false,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'remove',
					description: cmdLang.slashOptions.remove,
					autocomplete: true,
					required: false,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			//clientPermissions : []
		});
	}
	execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);

		try {
			if (i.member!.user.id !== appConfig.botConfig.dercrakerId) {
				return i.reply({
					content: cmdLang.i.notOwnerError,
					ephemeral: true,
				});
			}

			let adminList: Array<any> = new Array<any>();
			const adminRole = i.guild!.roles.cache.get(appConfig.Roles.ADMIN);
			if (i.options.get('add') == null && i.options.get('remove') == null) {
				const adminRoleList = i
					.guild!.roles.cache.get(appConfig.Roles.ADMIN)!
					.members.filter(u => appConfig.botConfig.admins.includes(u.id));

				adminRoleList.forEach(u => {
					adminList.push(u.nickname == null ? u.user.username : u.nickname);
				});
				let adminListEmbed = DefaultEmbed();
				adminListEmbed.data.fields!.push({
					name: cmdLang.embed.adminListField,
					value: adminList.join(' , '),
				});

				return i.reply({
					embeds: [adminListEmbed],
					ephemeral: true,
				});
			} else if (
				i.options.get('add') != null &&
				i.options.get('remove') == null
			) {
				i.guild!.members.cache.forEach(u => {
					if (
						u.user.username === i.options.get('add')!.value ||
						u.nickname === i.options.get('add')
					) {
						if (u.id === appConfig.botConfig.dercrakerId) {
							return i.reply({
								content: cmdLang.i.notManagableUser,
								ephemeral: true,
							});
						}
						u.roles.add(adminRole!);
						this.client.admins.push(u.id);

						fs.writeFile(
							path.join(__dirname, '../../../Util/appConfig.json'),
							JSON.stringify(appConfig),
							function writeJSON(err) {
								if (err) return console.log(err);
							},
						);

						return i.reply({
							content: cmdLang.i.addUser.format(
								u.nickname == null ? u.user.username : u.nickname,
							),
							ephemeral: true,
						});
					}
				});
			} else if (
				i.options.get('add') == null &&
				i.options.get('remove') != null
			) {
				i.guild!.roles.cache.get(appConfig.Roles.ADMIN)!.members.forEach(u => {
					if (
						(appConfig.botConfig.admins.includes(u.id) &&
							u.user.username === i.options.get('remove')!.value) ||
						u.nickname === i.options.get('remove')
					) {
						if (u.id === appConfig.botConfig.dercrakerId) {
							return i.reply({
								content: cmdLang.i.notManagableUser,
								ephemeral: true,
							});
						}
						u.roles.remove(adminRole!);
						appConfig.botConfig.admins = appConfig.botConfig.admins.filter(
							id => id !== u.id,
						);

						fs.writeFile(
							path.join(__dirname, '../../../Util/appConfig.json'),
							JSON.stringify(appConfig),
							function writeJSON(err) {
								if (err) return console.log(err);
							},
						);

						return i.reply({
							content: cmdLang.i.removeUser.format(
								u.nickname == null ? u.user.username : u.nickname,
							),
							ephemeral: true,
						});
					}
				});
			} else {
				return i.reply({
					content: cmdLang.i.dualOptions,
					ephemeral: true,
				});
			}
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
	onAutocomplete(i: AutocompleteInteraction) {
		const focusedOption = i.options.getFocused(true);
		let choices: Array<any> = new Array<any>();

		if (focusedOption.name === 'add') {
			i.guild!.members.cache.forEach(user => {
				if (
					!user.roles.cache.map(r => r.id).includes(appConfig.Roles.ADMIN) &&
					!choices.includes(user.user.username) &&
					user.id != appConfig.botConfig.dercrakerId
				) {
					choices.push(
						user.nickname == null ? user.user.username : user.nickname,
					);
				}
			});
		}

		if (focusedOption.name === 'remove') {
			i.guild!.members.cache.forEach(user => {
				if (
					user.roles.cache.map(r => r.id).includes(appConfig.Roles.ADMIN) &&
					!choices.includes(user.user.username) &&
					user.id != appConfig.botConfig.dercrakerId
				) {
					choices.push(
						user.nickname == null ? user.user.username : user.nickname,
					);
				}
			});
		}

		const filtered = choices!.filter((choice: any) =>
			choice.startsWith(focusedOption.value),
		);
		i.respond(filtered.map((choice: any) => ({ name: choice, value: choice })));
	}
}
