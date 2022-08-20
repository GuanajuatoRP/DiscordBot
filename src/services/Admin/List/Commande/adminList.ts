import { Command } from 'sheweny';
import { ApplicationCommandOptionType } from 'discord.js';
import { DefaultEmbed } from '../../../../tools/export';
import fs from 'fs';
import path from 'path';
import type { ShewenyClient } from 'sheweny';
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import appConfig from '../../../../util/appConfig.json';
import lang from '../../../../tools/language.json';
const cmdLang = lang.commands.adminlist;

export class AdminListCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'adminlist',
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
	execute(interaction: CommandInteraction) {
		this.client.emit('AdminCommandLog', interaction as CommandInteraction);

		try {
			if (interaction.member!.user.id !== appConfig.botConfig.dercrakerId) {
				return interaction.reply({
					content: cmdLang.interaction.notOwnerError,
					ephemeral: true,
				});
			}

			let adminList: Array<any> = new Array<any>();
			const adminRole = interaction.guild!.roles.cache.get(
				appConfig.Roles.ADMIN,
			);
			if (
				interaction.options.get('add') == null &&
				interaction.options.get('remove') == null
			) {
				const adminRoleList = interaction
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

				return interaction.reply({
					embeds: [adminListEmbed],
					ephemeral: true,
				});
			} else if (
				interaction.options.get('add') != null &&
				interaction.options.get('remove') == null
			) {
				interaction.guild!.members.cache.forEach(u => {
					if (
						u.user.username === interaction.options.get('add')!.value ||
						u.nickname === interaction.options.get('add')
					) {
						if (u.id === appConfig.botConfig.dercrakerId) {
							return interaction.reply({
								content: cmdLang.interaction.notManagableUser,
								ephemeral: true,
							});
						}
						u.roles.add(adminRole!);
						this.client.admins.push(u.id);

						fs.writeFile(
							path.join(__dirname, '../../../util/appConfig.json'),
							JSON.stringify(appConfig),
							function writeJSON(err) {
								if (err) return console.log(err);
							},
						);

						return interaction.reply({
							content: cmdLang.interaction.addUser.format(
								u.nickname == null ? u.user.username : u.nickname,
							),
							ephemeral: true,
						});
					}
				});
			} else if (
				interaction.options.get('add') == null &&
				interaction.options.get('remove') != null
			) {
				interaction
					.guild!.roles.cache.get(appConfig.Roles.ADMIN)!
					.members.forEach(u => {
						if (
							(appConfig.botConfig.admins.includes(u.id) &&
								u.user.username === interaction.options.get('remove')!.value) ||
							u.nickname === interaction.options.get('remove')
						) {
							if (u.id === appConfig.botConfig.dercrakerId) {
								return interaction.reply({
									content: cmdLang.interaction.notManagableUser,
									ephemeral: true,
								});
							}
							u.roles.remove(adminRole!);
							appConfig.botConfig.admins = appConfig.botConfig.admins.filter(
								id => id !== u.id,
							);

							fs.writeFile(
								path.join(__dirname, '../../../util/appConfig.json'),
								JSON.stringify(appConfig),
								function writeJSON(err) {
									if (err) return console.log(err);
								},
							);

							return interaction.reply({
								content: cmdLang.interaction.removeUser.format(
									u.nickname == null ? u.user.username : u.nickname,
								),
								ephemeral: true,
							});
						}
					});
			} else {
				return interaction.reply({
					content: cmdLang.interaction.dualOptions,
					ephemeral: true,
				});
			}
		} catch (error) {
			interaction.reply(lang.bot.errorMessage);
			this.client.emit('FailCommandLog', interaction, error);
		}
	}
	onAutocomplete(interaction: AutocompleteInteraction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices: Array<any> = new Array<any>();

		if (focusedOption.name === 'add') {
			interaction.guild!.members.cache.forEach(user => {
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
			interaction.guild!.members.cache.forEach(user => {
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
		interaction.respond(
			filtered.map((choice: any) => ({ name: choice, value: choice })),
		);
	}
}
